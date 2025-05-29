import { useEffect, useState } from 'react';
import ProductImg from '../../assets/images/mens/seven.jpg';
import { adminToken, apiUrlFront } from './http';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {

    const [products, setProducts] = useState([]);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch(`${apiUrlFront}/get-featured-products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 200) {
                setProducts(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch Featured products. Please try again.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            toast.error('Unable to connect to the server.');
        }
    }

    useEffect(() => {
        fetchFeaturedProducts()
    }, []);

    return (
        <section className='section-2 py-5'>
            <div className='container'>
                <h2>Featured Products</h2>
                <div className='row mt-4'>
                    {
                        products && products.map(product => {
                            return (
                                <div className='col-md-3 col-6' key={`product-${product.id}`}>
                                    <div className='product card border-0'>
                                        <div className='card-img'>
                                            <Link to={`/product/${product.id}`}>
                                                <img src={product.image_url} alt='' className='w-100' />
                                            </Link>
                                        </div>
                                        <div className='card-body pt-3'>
                                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            <div className='price'>
                                                {product.price} &nbsp;

                                                {
                                                    product.compare_price && <span className='text-decoration-line-through'>{product.compare_price}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts