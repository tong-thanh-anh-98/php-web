import ProductImg from '../../assets/images/mens/eight.jpg';
import { Link } from 'react-router-dom';

const LatesProducts = () => {
    return (
        <section className='section-2 pt-5'>
            <div className='container'>
                <h2>HÀNG MỚI VỀ</h2>
                <div className='row mt-4'>
                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'>
                                <Link to="/product">
                                    <img src={ProductImg} alt='' className='w-100' />
                                </Link>
                            </div>
                            <div className='card-body pt-3'>
                                <Link to='/product'>Sản phẩm mới về.</Link>
                                <div className='price'>
                                    99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'>
                                <img src={ProductImg} alt='' className='w-100' />
                            </div>
                            <div className='card-body pt-3'>
                                <a href=''>Sản phẩm mới về.</a>
                                <div className='price'>
                                    99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'>
                                <img src={ProductImg} alt='' className='w-100' />
                            </div>
                            <div className='card-body pt-3'>
                                <a href=''>Sản phẩm mới về.</a>
                                <div className='price'>
                                    99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'>
                                <img src={ProductImg} alt='' className='w-100' />
                            </div>
                            <div className='card-body pt-3'>
                                <a href=''>Sản phẩm mới về.</a>
                                <div className='price'>
                                    99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LatesProducts