import { Link, useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import { useContext, useState } from 'react';
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { formatPrice } from "./context/FormatPrice";
import { apiUrlFront, userToken } from "./common/http";
import { toast } from "react-toastify";
import { parseCurrency } from '../utils/currency';

const Checkout = () => {
    const [paymentMethod, setPayMentMethod] = useState('cod');
    const { cartData, shipping, subTotal, grandTotal } = useContext(CartContext);
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    const handPaymentMethod = (e) => {
        setPayMentMethod(e.target.value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const processOrder = (data) => {
        if (paymentMethod === 'cod') {
            saveOrder(data, 'not paid');
        }
    }

    const saveOrder = async (formData, paymentStatus) => {
        try {
            const newFormData = {
                ...formData,
                grand_total: grandTotal(),
                sub_total: subTotal(),
                shipping: shipping(),
                discount: 0,
                payment_status: paymentStatus,
                status: 'pending',
                cart: cartData.map(item => ({
                    product_id: item.product_id,
                    name: item.title,
                    size: item.size,
                    qty: item.qty,
                    price: parseCurrency(item.price)
                }))
            }

            const response = await fetch(`${apiUrlFront}/save-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                },
                body: JSON.stringify(newFormData)
            });

            const result = await response.json();
            if (result.status === 200) {
                clearCart();
                toast.success(result.message);
                navigate(`/order/confirmation/${result.id}`);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            console.error('Failed to save order:', err);
            toast.error('Cannot connect to server.');
        }
    }

    return (
        <Layout>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="border-bottom pb-3">Billing Details</h3>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('name', { required: 'The name field is required' })}
                                            type='text'
                                            className={`form-control ${errors.name && 'is-invalid'}`}
                                            placeholder='Enter name' />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                            ...register('email', {
                                                required: "The email field is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })
                                            }
                                            type='text'
                                            className={`form-control ${errors.email && 'is-invalid'}`}
                                            placeholder='Enter email' />
                                        {
                                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <textarea
                                            id="address"
                                            {...register('address', { required: 'The address field is required' })}
                                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            rows={3}
                                            placeholder="Enter your address"
                                        ></textarea>
                                        {
                                            errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('city', { required: 'The city field is required' })}
                                            type='text'
                                            className={`form-control ${errors.city && 'is-invalid'}`}
                                            placeholder='Enter city' />
                                        {
                                            errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('state', { required: 'The state field is required' })}
                                            type='text'
                                            className={`form-control ${errors.state && 'is-invalid'}`}
                                            placeholder='Enter state' />
                                        {
                                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('zip', { required: 'The zip field is required' })}
                                            type='text'
                                            className={`form-control ${errors.zip && 'is-invalid'}`}
                                            placeholder='Enter zip code.' />
                                        {
                                            errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {...register('mobile', { required: 'The mobile field is required' })}
                                            type='text'
                                            className={`form-control ${errors.mobile && 'is-invalid'}`}
                                            placeholder='Enter phone number' />
                                        {
                                            errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3 className="border-bottom pb-3">Items</h3>
                            <table className="table">
                                <tbody>
                                    {
                                        cartData && cartData.map(item => {
                                            return (
                                                <tr key={`cart-${item.id}`}>
                                                    <td width={100}>
                                                        <img src={item.image_url} width={80} alt="product image" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{item.title}</h4>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <span>{item.price}</span>
                                                            <div className="ps-3">
                                                                {
                                                                    item.size && <button className="btn btn-size">{item.size}</button>
                                                                }
                                                            </div>

                                                            <div className="ps-5">Quantity: {item.qty}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <div>Subtotal</div>
                                        <div>{formatPrice(subTotal())}</div>
                                    </div>

                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>Shipping</div>
                                        <div>{formatPrice(shipping())}</div>
                                    </div>

                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div><strong>Grand total</strong></div>
                                        <div>{formatPrice(grandTotal())}</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="border-bottom pt-4 pb-3">Payment Method</h3>
                            <div>
                                <div>
                                    <input
                                        id="cod"
                                        type="radio"
                                        name="paymentMethod"
                                        value={'cod'}
                                        defaultChecked={paymentMethod === 'cod'}
                                        onClick={handPaymentMethod}
                                    />
                                    <label htmlFor="cod" className="form-label ps-2">Cash on Delivery</label>
                                </div>
                            </div>
                            <div>
                                <input
                                    id="stripe"
                                    type="radio"
                                    name="paymentMethod"
                                    value={'stripe'}
                                    defaultChecked={paymentMethod === 'stripe'}
                                    onClick={handPaymentMethod}
                                />
                                <label htmlFor="stripe" className="form-label ps-2">Online Payment</label>
                            </div>

                            <div className="d-flex justify-content-end py-3">
                                <button className="btn btn-primary">Pay Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </Layout >
    )
}

export default Checkout