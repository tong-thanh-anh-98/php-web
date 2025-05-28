import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { useEffect, useState } from 'react';

const Edit = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const { register, handleSubmit, reset, formState: { errors } } = useForm({
    //     defaultValues: async () => {
    //         fetch(`${apiUrl}/brands/${params.id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //                 'Authorization': `Bearer ${adminToken()}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(result => {
    //                 console.log(result);
    //                 if (result.status === 200) {
    //                     reset({
    //                         name: result.data.name,
    //                         status: result.data.status,
    //                     })
    //                 } else {
    //                     console.log('Something went wrong.')
    //                 }
    //             });
    //     }
    // });

    useEffect(() => {
        fetch(`${apiUrl}/brands/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    reset({
                        name: result.data.name,
                        status: result.data.status
                    });
                } else if (result.status === 404) {
                    toast.error(result.message || 'Brand not found.');
                    navigate('/admin/brands');
                } else {
                    toast.error("An error occurred while loading the data.");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Unable to connect to the server.");
            });
    }, [params.id, reset, navigate]);

    const updateBrand = (data) => {
        setDisable(true)
        fetch(`${apiUrl}/brands/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status === 200) {
                    toast.success(result.message || 'Brand updated successfully.');
                    navigate('/admin/brands')
                } else {
                    toast.error(result.message || 'Brand not found.');
                    console.error('Update failed:', result);
                }
            })
            .catch(err => {
                setDisable(false);
                console.error('Update error:', err);
                toast.error('Unable to connect to the server.');
            });
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Edit / Brand</h4>
                        <Link to="/admin/brands" className=' btn btn-primary'>Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(updateBrand)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Name</label>
                                        <input
                                            {
                                            ...register('name',
                                                { required: 'The name field is required' }
                                            )
                                            }
                                            type='text'
                                            className={`form-control ${errors.name && 'is-invalid'}`}
                                            placeholder='Enter name' />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Status</label>
                                        <select
                                            {
                                            ...register('status',
                                                { required: 'Please select a status' }
                                            )
                                            }
                                            className={`form-control ${errors.status && 'is-invalid'}`}>
                                            <option value="">Select a status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {
                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <button
                                disabled={disable}
                                type="submit" className='btn btn-primary mt-3'>Update</button> */}
                            <button disabled={disable} type="submit" className="btn btn-primary mt-3">
                                {disable ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Edit