import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Sidebar from '../../common/Sidebar';
import { parseCurrency } from '../../../utils/currency';
import { formatPrice } from '../../context/FormatPrice';

const Shipping = () => {
    const [disable, setDisable] = useState(false);
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
    const [formattedCharge, setFormattedCharge] = useState('');

    useEffect(() => {
        const fetchShipping = async () => {
            try {
                const response = await fetch(`${apiUrl}/get-shipping`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    }
                });

                const result = await response.json();
                if (result.status === 200) {
                    const charge = parseCurrency(result.data.shipping_charge);
                    reset({ shipping_charge: charge });
                    setFormattedCharge(formatPrice(charge));
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Unable to connect to the server.');
            }
        };

        fetchShipping();
    }, [reset]);

    const saveShipping = async (data) => {
        setDisable(true);
        try {
            const response = await fetch(`${apiUrl}/save-shipping`, {
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
                toast.success(result.message);
                // update value 
                setFormattedCharge(formatPrice(parseCurrency(data.shipping_charge)));
            } else if (result.errors) {
                Object.keys(result.errors).forEach((field) => {
                    setError(field, { type: 'server', message: result.errors[field][0] });
                });
                toast.error('Please correct the errors in the form.');
            } else {
                toast.error(result.message);
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
                        <h4 className='h4 pb-0 mb-0'>Category / Create</h4>
                        <Link to="/admin/shipping" className=' btn btn-primary'>Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveShipping)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Shipping Charge</label>
                                        <input
                                            {
                                            ...register('shipping_charge',
                                                { required: 'The shipping charge field is required' }
                                            )
                                            }
                                            type='text'
                                            className={`form-control ${errors.shipping_charge && 'is-invalid'}`}
                                            placeholder='Enter shipping charge' />
                                        {
                                            errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                                        }
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Shipping Charge Apply: <strong>{formattedCharge}</strong></label>
                                    </div>

                                    <button disabled={disable} type="submit" className="btn btn-primary mt-3">
                                        {disable ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shipping