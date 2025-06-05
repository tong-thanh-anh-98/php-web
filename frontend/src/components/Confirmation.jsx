import { useCallback, useEffect, useState } from 'react';
import Layout from './common/Layout';
import { apiUrlFront, userToken } from './common/http';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

const Confirmation = () => {
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const fetchOrder = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrlFront}/get-order-details/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setOrder(result.data);
                setItems(result.data.items);
            } else {
                toast.error(result.message);
                console.error('Fetch orders failed:', result);
            }
        } catch (error) {
            console.error('Fetch orders error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <Layout>
            <div className='container py-5'>
                {
                    loading === true &&
                    <div className='text-center py-5'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }

                {
                    loading === false && order !== null &&
                    <div>
                        <div className='row'>
                            <h1 className='text-center fw-bold text-success'>Thank You!</h1>
                            <p className='text-muted text-center'>You order has been successfully placed.</p>
                        </div>
                        <div className='card shadow'>
                            <div className='card-body'>
                                <h3 className='fw-bold'>Order Summary</h3>
                                <hr />
                                <div className='row'>
                                    <div className='col-6'>
                                        <p><strong>Order ID: </strong> #{order.id}</p>
                                        <p><strong>Date: </strong> {order.created_at}</p>
                                        <p>
                                            <strong>Status: </strong>
                                            {
                                                order.status === 'pending' && <span className='badge bg-warning'>Pending</span>
                                            }
                                            {
                                                order.status === 'shipped' && <span className='badge bg-info'>Shipped</span>
                                            }
                                            {
                                                order.status === 'delivered' && <span className='badge bg-success'>delivered</span>
                                            }
                                            {
                                                order.status === 'cancelled' && <span className='badge bg-danger'>Cancelled</span>
                                            }
                                        </p>
                                        <p><strong>Payment Method: </strong> {order.payment_status}</p>
                                    </div>
                                    <div className='col-6'>
                                        <p><strong>Customer: </strong> {order.name}</p>
                                        <p><strong>Address: </strong> {order.zip}, {order.address}, {order.district}, {order.city}</p>
                                        <p><strong>Contact: </strong> {order.mobile}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-12">
                                        <table className="table-striped table-bordered table">
                                            <thead className='table-light'>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th width="150">Price</th>
                                                    <th width="150">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    items.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.unit_price}</td>
                                                            <td>{item.price}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Subtotal</td>
                                                    <td>{order.sub_total}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Shipping</td>
                                                    <td>{order.shipping}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Grand Total</td>
                                                    <td>{order.grand_total}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary">View Order Details</button>
                                        <Link to={'/'} className="btn btn-outline-secondary ms-2">Continue Shopping</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    loading === false && !order &&
                    <div className='row'>
                        <h1 className='text-center fw-bold text-muted'>Order not found.</h1>
                    </div>
                }
            </div>
        </Layout>
    )
}

export default Confirmation