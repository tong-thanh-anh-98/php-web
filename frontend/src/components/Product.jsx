import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Rating } from 'react-simple-star-rating';
import { useEffect, useState } from 'react';
import { apiUrlFront } from './common/http';
import { toast } from 'react-toastify';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating] = useState(4);
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${apiUrlFront}/get-product/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setProduct(result.data);
                setProductImages(result.data.product_images);
                setProductSizes(result.data.product_sizes);
            } else {
                toast.error(result.message || 'Failed to load categories.');
                console.error('Fetch categories failed:', result);
            }
        } catch (error) {
            console.error('Fetch categories error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <Layout>
            <div className="container product-detail">
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to='/shop'>Shop</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
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
                                    // loop={true}
                                    loop={product.images?.length > 1} // Avoid displaying warnings while keeping the loop running when needed.
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {
                                        productImages && productImages.map((product_image, index) => {
                                            return (
                                                <SwiperSlide key={`thumb-${index}`}>
                                                    <div className='content'>
                                                        <img
                                                            src={product_image.image_url}
                                                            alt=""
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className='col-md-10'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    // loop={true}
                                    loop={product.images?.length > 1} // Avoid displaying warnings while keeping the loop running when needed.
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {
                                        productImages && productImages.map((product_image, index) => {
                                            return (
                                                <SwiperSlide key={`main-${index}`}>
                                                    <div className='content'>
                                                        <img
                                                            src={product_image.image_url}
                                                            alt=""
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    {
                        product && (
                            <div className='col-md-7' key={`product-${product.id}`}>
                                <h2>{product.title}</h2>
                                <div className='d-flex'>
                                    <Rating
                                        size={20}
                                        readonly
                                        initialValue={rating}
                                    />
                                    <span className='pt-1 ps-2'>10 Reviews</span>
                                </div>

                                <div className='price h3 py-3'>
                                    {product.price} &nbsp;

                                    {
                                        product.compare_price && <span className='text-decoration-line-through'>{product.compare_price}</span>
                                    }
                                </div>

                                <div>
                                    {product.short_description}
                                </div>
                                <div className='pt-3'>
                                    <strong>Select Size</strong>
                                    <div className='sizes pt-2'>
                                        {
                                            productSizes && productSizes.map(product_size => {
                                                return (
                                                    <button className='btn btn-size ms-1' key={`size-${product_size.id}`}>{product_size.size.name}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='add-to-cart mt-4'>
                                    <button className='btn btn-primary text-uppercase'><Link to='/cart'>Add To Cart</Link></button>
                                </div>

                                <hr />

                                <div>
                                    <strong>SKU: </strong>
                                    {product.sku}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: product.description }}>

                                </div>
                                {/* {product.description} */}
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Reviews product
                            </Tab>
                            <Tab eventKey="contact" title="Contact" disabled>
                                Contact for shop.
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product