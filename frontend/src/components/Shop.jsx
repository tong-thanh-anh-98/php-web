import Layout from './common/Layout';
import { Link, useSearchParams } from "react-router-dom";
import { apiUrlFront } from './common/http';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './common/Loader';
import Notate from './Notate';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchPrams, setSearchParams] = useSearchParams([]);

    const [categoryChecked, setCategoryChecked] = useState(() => {
        const category = searchPrams.get('category');
        return category ? category.split(',') : [];
    });

    const [brandChecked, setBrandChecked] = useState(() => {
        const brand = searchPrams.get('brand');
        return brand ? brand.split(',') : [];
    });

    const [loader, setLoader] = useState(false);
    const isLoading = loader === true;
    const noProducts = !loader && products.length === 0;
    const hasProducts = products && products.length > 0;

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${apiUrlFront}/get-categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setCategories(result.data);
            } else {
                toast.error(result.message || 'Failed to load categories.');
                console.error('Fetch categories failed:', result);
            }
        } catch (error) {
            console.error('Fetch categories error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await fetch(`${apiUrlFront}/get-brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setBrands(result.data);
            } else {
                toast.error(result.message || 'Failed to load brands.');
                console.error('Fetch brands failed:', result);
            }
        } catch (error) {
            console.error('Fetch brands error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        }
    };

    const fetchProducts = useCallback(async () => { // wrap fetchProducts with useCallback
        setLoader(true);
        try {
            let search = [];
            let params = '';

            if (categoryChecked.length > 0) {
                search.push(['category', categoryChecked]);
            }

            if (brandChecked.length > 0) {
                search.push(['brand', brandChecked]);
            }

            if (search.length > 0) {
                params = new URLSearchParams(search);
                setSearchParams(params);
            } else {
                setSearchParams([]);
            }

            const res = await fetch(`${apiUrlFront}/get-products?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setProducts(result.data);
            } else {
                toast.error(result.message || 'Failed to load products.');
                console.error('Fetch Products failed:', result);
            }
        } catch (error) {
            console.error('Fetch products error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        } finally {
            setLoader(false);
        }
    }, [categoryChecked, brandChecked, setSearchParams]);

    const handCategory = async (e) => {
        const { checked, value } = e.target;

        if (checked) {
            setCategoryChecked(pre => [...pre, value]);
        } else {
            setCategoryChecked(categoryChecked.filter(id => id !== value));
        }
    }

    const handBrand = async (e) => {
        const { checked, value } = e.target;

        if (checked) {
            setBrandChecked(pre => [...pre, value]);
        } else {
            setBrandChecked(brandChecked.filter(id => id !== value));
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchProducts();
    }, [fetchProducts]); // replace [categoryChecked, brandChecked] with fetchProducts


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
                                <h3 className="mb-3">Categories</h3>
                                <ul>
                                    {
                                        categories && categories.map(category => {
                                            return (
                                                <li className="mb-2" key={`category-${category.id}`}>
                                                    <input
                                                        checked={searchPrams.get('category') ? searchPrams.get('category').includes(category.id) : false}
                                                        // checked={categoryChecked.includes(category.id)} // Use categoryChecked.includes(id) instead of parsing from searchParams
                                                        type="checkbox"
                                                        value={category.id}
                                                        id={`category-${category.id}`}
                                                        // onClick={handCategory}
                                                        onChange={handCategory} // Use onChange instead of onClick
                                                    />
                                                    <label htmlFor={`category-${category.id}`} className="ps-2">{category.name}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow border-0 mb-3">
                            <div className="card body p-4">
                                <h3 className="mb-3">Brands</h3>
                                <ul>
                                    {
                                        brands && brands.map(brand => {
                                            return (
                                                <li className="mb-2" key={`brand-${brand.id}`}>
                                                    <input
                                                        checked={searchPrams.get('brand') ? searchPrams.get('brand').includes(brand.id) : false}
                                                        // checked={brandChecked.includes(brand.id)} //Use categoryChecked.includes(id) instead of parsing from searchParams
                                                        type="checkbox"
                                                        value={brand.id}
                                                        id={`brand-${brand.id}`}
                                                        // onClick={handBrand}
                                                        onChange={handBrand} // Use onChange instead of onClick
                                                    />
                                                    <label htmlFor={`brand-${brand.id}`} className="ps-2">{brand.name}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row pb-5">
                            {isLoading && <Loader />}
                            {noProducts && <Notate text="Products not found." />}
                            {hasProducts &&
                                products && products.map(product => {
                                    return (
                                        <div className='col-md-4 col-6' key={`product-${product.id}`}>
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
                </div>
            </div>
        </Layout>
    )
}

export default Shop