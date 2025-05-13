import Layout from './common/Layout';
import ProductImg from '../assets/images/mens/eight.jpg';
import { Link } from "react-router-dom";

const Shop = () => {
    return (
        <Layout>
            <div className="container">
                <nav aria-label="breadcrumb" className="py-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to='#'>Shop</Link></li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card shadow border-0 mb-3">
                            <div className="card body p-4">
                                <h3 className="mb-3">DANH MỤC</h3>
                                <ul>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Danh mục 1</label>
                                    </li>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Danh mục 2</label>
                                    </li>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Danh mục 3</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow border-0 mb-3">
                            <div className="card body p-4">
                                <h3 className="mb-3">THƯƠNG HIỆU</h3>
                                <ul>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Puma</label>
                                    </li>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Nile</label>
                                    </li>
                                    <li className="mb-2">
                                        <input type="checkbox" />
                                        <label htmlFor="" className="ps-2">Adidas</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row pb-5">
                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 col-6'>
                                <div className='product card border-0'>
                                    <div className='card-img'>
                                        <img src={ProductImg} alt='' className='w-100' />
                                    </div>
                                    <div className='card-body pt-3'>
                                        <a href=''>Tên sản phẩm</a>
                                        <div className='price'>
                                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop