import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../common/Layout'
import UserSidebar from '../common/UserSidebar'
import { useParams } from 'react-router-dom';
import { apiUrlFront, userToken } from '../common/http';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const params = useParams();

    const fetchOrder = useCallback(async () => {
        setLoader(true);
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
            console.log(result.data);
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
            setLoader(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Order Detail</h4>
                    </div>
                    <div className='col-md-3'>
                        <UserSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='card shadow mb-5'>
                            <div className='card-body p-4'>
                                {
                                    loader === true && <Loader />
                                }
                                {
                                    loader === false &&
                                    <div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h3>Order ID: #{order.id}</h3>
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
                                            </div>

                                            <div className="col-md-4">
                                                <div className="text-secondary">Date</div>
                                                <h4 className='pt-2'>{order.created_at}</h4>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="text-secondary">Payment</div>
                                                {
                                                    order.payment_status === 'paid' ?
                                                        <span className="badge bg-success">Paid</span> :
                                                        <span className="badge bg-danger">Not Paid</span>
                                                }
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className='py-3'>
                                                    <strong>{order.name}</strong>
                                                    <div>{order.email}</div>
                                                    <div>{order.mobile}</div>
                                                    <div>{order.zip}, {order.address}, {order.district} {order.city}</div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="text-secondary py-3">Payment Method</div>
                                                {
                                                    order.payment_status === 'not paid' && <p>Cash on Delivery</p>
                                                }
                                                {
                                                    order.payment_status === 'paid' && <p>Online Payment</p>
                                                }
                                                {/* <p>COD</p> */}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <h3 className="pb-2 "><strong>Items</strong></h3>
                                            {
                                                items.map((item) => {
                                                    return (
                                                        <div className="row justify-content-end" key={item.id}>
                                                            <div className="col-lg-12">
                                                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                    <div className="d-flex">
                                                                        {/* {
                                                                                        item.product.image && <img width="70" className="me-3" src={item.product.image_url} alt="Product image" />
                                                                                    } */}
                                                                        {
                                                                            items && items.length > 0 ? (
                                                                                <img width="70" className="me-3" src={item.product.image_url} alt="Product image" />
                                                                            ) : (
                                                                                <img src="/images/no_image.png" alt="No image" width="70" className="me-3" />
                                                                            )
                                                                        }
                                                                        <div className="d-flex flex-column">
                                                                            <div className="mb-2"><span>{item.name}</span></div>
                                                                            <div>
                                                                                <button className="btn btn-size">{item.size}</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-column">
                                                                        <div>Quantity: {item.qty}</div>
                                                                        <div className="ps-3">{item.price}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className="row justify-content-end">
                                                <div className="col-lg-12">
                                                    <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                        <div>Subtotal</div>
                                                        <div>{order.sub_total}</div>
                                                    </div>

                                                    <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                        <div>Shipping</div>
                                                        <div>{order.shipping}</div>
                                                    </div>

                                                    <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                        <div><strong>Grand Total</strong></div>
                                                        <div>{order.grand_total}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OrderDetail