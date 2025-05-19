import Layout from './common/Layout'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImgOne from '../assets/images/mens/five.jpg';
import ProductImgTwo from '../assets/images/mens/six.jpg';
import ProductImgThree from '../assets/images/mens/seven.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating] = useState(4);
    return (
        <Layout>
            <div className="container product-detail">
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to='/shop'>Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Tên sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-md-5'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className='col-md-10'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <h2>Tên sản phẩm</h2>
                        <div className='d-flex'>
                            <Rating
                                size={20}
                                readonly
                                initialValue={rating}
                            />
                            <span className='pt-1 ps-2'>10 Đánh giá</span>
                        </div>

                        <div className='price h3 py-3'>
                            99.000đ <span className='text-decoration-line-through'>199.000đ</span>
                        </div>

                        <div>
                            Sản phẩm chính hãng. <br />
                            Thanh toán linh hoạt, có thể thanh toán E-Banking hoặc thanh toán khi nhận hàng. <br />
                            Dễ dàng đổi trả hàng khi có lỗi từ nhà sản xuất.
                        </div>
                        <div className='pt-3'>
                            <strong>Select Size</strong>
                            <div className='sizes pt-2'>
                                <button className='btn btn-size ms-1'>S</button>
                                <button className='btn btn-size ms-1'>M</button>
                                <button className='btn btn-size ms-1'>L</button>
                                <button className='btn btn-size ms-1'>XL</button>
                            </div>
                        </div>

                        <div className='add-to-cart mt-4'>
                            <button className='btn btn-primary text-uppercase'><Link to='/cart'>Add To Cart</Link></button>
                        </div>

                        <hr />

                        <div>
                            <strong>SKU: </strong>
                            skuxxxxx00
                        </div>
                    </div>
                </div>
                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Description">
                                Mô tả sản phẩm.
                            </Tab>
                            <Tab eventKey="profile" title="Reviews (10)">
                                Đánh giá sản phẩm.
                            </Tab>
                            <Tab eventKey="contact" title="Contact" disabled>
                                Liên hệ với cửa hàng.
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product