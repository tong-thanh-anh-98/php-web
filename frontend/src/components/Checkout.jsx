import { Link } from "react-router-dom";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/products/six.jpg";
import { useState } from 'react';

const Checkout = () => {
    const [paymentMethod, setPayMentMethod] = useState('cod');

    const handPaymentMethod = (e) => {
        setPayMentMethod(e.target.value);
    };

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

                <div className="row">
                    <div className="col-md-7">
                        <h3 className="border-bottom pb-3">Billing Details</h3>
                        <form action="">
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Name" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <textarea className="form-control" rows={5} placeholder="Address"></textarea>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="City" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="State" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Zip Code" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="number" className="form-control" placeholder="Phone Number" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-5">
                        <h3 className="border-bottom pb-3">Items</h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} alt="product image" />
                                    </td>
                                    <td width={600}>
                                        <h4>Áo thun trơn</h4>
                                        <div className="d-flex align-items-center pt-3">
                                            <span>49.000đ</span>
                                            <div className="ps-3">
                                                <button className="btn btn-size">S</button>
                                            </div>
                                            <div className="ps-5">Số lượng: 1</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <div>Subtotal</div>
                                    <div>99.000đ</div>
                                </div>

                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Shipping</div>
                                    <div>free ship</div>
                                </div>

                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Grand total</strong></div>
                                    <div>99.000đ</div>
                                </div>
                            </div>
                        </div>

                        <h3 className="border-bottom pt-4 pb-3">Payment Method</h3>
                        <div>
                            <input type="radio" onClick={handPaymentMethod} checked={paymentMethod == 'stripe'} value={'stripe'} className="pt-2" />
                            <label htmlFor="" className="form-label ps-2">Thanh toán khi nhận hàng</label>
                        </div>
                        <div>
                            <input type="radio" onClick={handPaymentMethod} checked={paymentMethod == 'cod'} value={'cod'} className="pt-2" />
                            <label htmlFor="" className="form-label ps-2">Thanh toán trực tuyến</label>
                        </div>

                        <div className="d-flex justify-content-end py-3">
                            <button className="btn btn-primary">Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout