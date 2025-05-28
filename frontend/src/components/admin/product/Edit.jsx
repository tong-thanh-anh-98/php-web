import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';

const Edit = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sizesChecked, setSizesChecked] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || ''
    }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm();

    // Fetch product data to pre-fill form
    useEffect(() => {
        fetch(`${apiUrl}/products/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setProductImages(result.data.product_images);
                // setSizesChecked(result.data.productSizes);
                setSizesChecked(Array.isArray(result.productSizes) ? result.productSizes.map(id => +id) : []);

                reset({
                    title: result.data.title,
                    price: parseFloat((result.data.price).replace(/[^\d]/g, '')),
                    compare_price: parseFloat((result.data.compare_price).replace(/[^\d]/g, '')),
                    description: result.data.description,
                    short_description: result.data.short_description,
                    category_id: result.data.category_id,
                    brand_id: result.data.brand_id,
                    qty: result.data.qty,
                    sku: result.data.sku,
                    barcode: result.data.barcode,
                    status: result.data.status,
                    is_featured: result.data.is_featured,
                    size: result.data.size
                });

                setContent(result.data.description);

            })
            .catch(err => {
                console.error('Fetch error:', err);
                toast.error('Unable to connect to the server. Please try again later.');
            });
    }, [params.id, reset]);

    const updateProduct = async (data) => {
        data.description = content;
        setDisable(true);

        try {
            const response = await fetch(`${apiUrl}/products/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.status === 200 || result.status === true) {
                toast.success(result.message || 'Product updated successfully.');
                navigate('/admin/products');
            } else if (result.errors) {
                Object.keys(result.errors).forEach((field) => {
                    setError(field, { type: 'server', message: result.errors[field][0] });
                });
                toast.error('Please correct the errors in the form.');
            } else {
                toast.error(result.message || 'Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Unable to connect to the server.');
        } finally {
            setDisable(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${apiUrl}/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
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
            const res = await fetch(`${apiUrl}/brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
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

    const fetchSizes = async () => {
        try {
            const res = await fetch(`${apiUrl}/sizes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await res.json();
            if (result.status === 200) {
                setSizes(result.data);
            } else {
                toast.error(result.message || 'Failed to load sizes.');
                console.error('Fetch sizes failed:', result);
            }
        } catch (error) {
            console.error('Fetch sizes error:', error);
            toast.error('Unable to connect to the server. Please try again later.');
        }
    };

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        formData.append("product_id", params.id);
        setDisable(true);

        try {
            const res = await fetch(`${apiUrl}/save-product-image`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: formData
            });
            const result = await res.json();

            if (result.status === 200) {
                setProductImages(prev => [...prev, result.data]);
            } else {
                toast.error(result.errors?.image?.[0] || result.message || 'Image upload failed.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('An error occurred while uploading image.');
        } finally {
            setDisable(false);
            e.target.value = "";
        }
    }

    const deleteImage = async (id) => {
        if (confirm("Are you sure you want to delete product image?")) {
            try {
                const res = await fetch(`${apiUrl}/delete-product-image/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    }
                });
                const result = await res.json();
                if (result.status === 200) {
                    const newProductImages = productImages.filter(productImage => productImage.id !== id);
                    setProductImages(newProductImages);
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Fetch sizes error:', error);
                toast.error('Unable to connect to the server. Please try again later.');
            }
        }
    };

    const changeImage = async (image) => {
        setDisable(true);
        try {
            const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
            });
            const result = await res.json();
            if (result.status === 200) {
                toast.success(result.message);
            } else {
                console.log('Something went wrong');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('An error occurred while uploading the image: ' + error.message);
        } finally {
            setDisable(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Product / Edit</h4>
                        <Link to="/admin/products" className=' btn btn-primary'>Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(updateProduct)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Title</label>
                                        <input
                                            {...register('title', { required: 'The title field is required' })}
                                            type='text'
                                            className={`form-control ${errors.title && 'is-invalid'}`}
                                            placeholder='Enter title' />
                                        {
                                            errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                        }
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Category</label>
                                                <select
                                                    {...register('category_id', { required: 'Please select a category' })}
                                                    className={`form-control ${errors.category_id && 'is-invalid'}`}>
                                                    <option value="">Select a category</option>
                                                    {
                                                        categories && categories.map((category) => {
                                                            return (
                                                                <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {
                                                    errors.category_id && <p className='invalid-feedback'>{errors.category_id?.message}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Brand</label>
                                                <select
                                                    {...register('brand_id')}
                                                    className='form-control'>
                                                    <option value="">Select a brand</option>
                                                    {
                                                        brands && brands.map((brand) => {
                                                            return (
                                                                <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Short Description</label>
                                        <textarea
                                            {...register('short_description')}
                                            className='form-control'
                                            rows={5}
                                            placeholder='Short description'></textarea>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Description</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={5} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Pricing</h3>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Price</label>
                                                <input
                                                    {...register('price', { required: 'The price field is required' })}
                                                    type='text'
                                                    className={`form-control ${errors.price && 'is-invalid'}`}
                                                    placeholder='Enter price' />
                                                {
                                                    errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Discounted Price</label>
                                                <input
                                                    // {...register('compare_price')}
                                                    {...register('compare_price', {
                                                        setValueAs: v => v === '' ? null : v
                                                    })} // tránh lưu giá trị === 0 khi k nhập gì.
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter discounted Price' />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Inventory</h3>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Sku</label>
                                                <input
                                                    {...register('sku', { required: 'The sku field is required' })}
                                                    type='text'
                                                    className={`form-control ${errors.sku && 'is-invalid'}`}
                                                    placeholder='Enter sku' />
                                                {
                                                    errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Barcode</label>
                                                <input
                                                    {...register('barcode')}
                                                    type='number'
                                                    className='form-control'
                                                    placeholder='Enter Barcode' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Qty</label>
                                                <input
                                                    {...register('qty')}
                                                    type='number'
                                                    className='form-control'
                                                    placeholder='Enter qty' />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label htmlFor='' className='form-label'>Status</label>
                                                <select
                                                    {...register('status', { required: 'Please select a status' })}
                                                    className={`form-control ${errors.status && 'is-invalid'}`}>
                                                    <option value="">Select a status</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Block</option>
                                                </select>
                                                {
                                                    errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Featured</label>
                                        <select
                                            {...register('is_featured', { required: 'Please select a featured' })}
                                            className={`form-control ${errors.is_featured && 'is-invalid'}`}>
                                            <option value="">Select a featured</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        {
                                            errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                                        }
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Sizes</h3>
                                    <div className='mb-3'>
                                        {
                                            sizes && sizes.map((size) => {
                                                return (
                                                    <div className="form-check-inline ps-2" key={`size-${size.id}`}>
                                                        <input
                                                            {...register('sizes')}
                                                            checked={Array.isArray(sizesChecked) && sizesChecked.includes(size.id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSizesChecked([...sizesChecked, size.id]); // add size
                                                                } else {
                                                                    setSizesChecked(sizesChecked.filter(sid => size.id !== sid)); // delete size
                                                                }
                                                            }}
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={size.id}
                                                            id={`size-${size.id}`}
                                                        />
                                                        <label className="form-check-label ps-2" htmlFor={`size-${size.id}`}>
                                                            {size.name}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Gallery</h3>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Image</label>
                                        <input
                                            onChange={handleFile}
                                            type='file'
                                            className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='row gy-3'>
                                            {
                                                productImages && productImages.map((productImage, index) => {
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={productImage.image_url} alt='' className='w-100' />
                                                            </div>
                                                            <button type="button" className='btn btn-danger mt-3 w-100' onClick={() => deleteImage(productImage.id)}>Delete</button>
                                                            <button type="button" className='btn btn-secondary mt-3 w-100' onClick={() => changeImage(productImage.image)}>Set as Default</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button disabled={disable} type="submit" className="btn btn-primary mt-3 mb-5">
                                {disable ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default Edit