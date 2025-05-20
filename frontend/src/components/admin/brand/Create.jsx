import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

const Create = () => {
    const [disable, setDisable] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // const saveBrand = (data) => {
    //     setDisable(true)
    //     console.log(data)
    //     fetch(`${apiUrl}/brands`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${adminToken()}`
    //         },
    //         body: JSON.stringify(data)
    //     }).then(res => res.json())
    //         .then(result => {
    //             setDisable(false);
    //             if (result.status === 200) {
    //                 toast.success(result.message);
    //                 navigate('/admin/brands')
    //             } else {
    //                 console.log('Something went wrong.')
    //             }
    //         });
    // }

    const saveBrand = async (data) => {
        setDisable(true);
        try {
            const response = await fetch(`${apiUrl}/brands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 200) {
                toast.success(result.message || 'Brand created successfully.');
                navigate('/admin/brands');
            } else {
                toast.error(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Unable to connect to the server.');
        } finally {
            setDisable(false);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Create / Brand</h4>
                        <Link to="/admin/brands" className=' btn btn-primary'>Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveBrand)}>
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
                                type="submit" className='btn btn-primary mt-3'>Create
                                </button> */}
                            <button disabled={disable} type="submit" className="btn btn-primary mt-3">
                                {disable ? 'Creating...' : 'Create'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create