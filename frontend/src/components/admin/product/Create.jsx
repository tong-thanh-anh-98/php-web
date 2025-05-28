import React, { useEffect, useState, useMemo, useRef } from 'react';
import Layout from '../../common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const navigate = useNavigate();
    const [sizes, setSizes] = useState([]);
    const [sizesChecked, setSizesChecked] = useState([]);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || ''
    }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const saveProduct = async (data) => {
        // const formData = { ...data, "content": content };
        data.description = content;
        data.gallery = gallery;
        setDisable(true);
        try {
            const response = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 201) {
                toast.success(result.message || 'Product created successfully.');
                navigate('/admin/products');
            } else if (result.errors) {
                const formErrors = result.errors;
                Object.keys(formErrors).forEach((field) => {
                    setError(field, { type: 'server', message: formErrors[field][0] });
                });
                toast.error('Please correct the errors in the form.');
            }
            else {
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
        setDisable(true);

        // await fetch(`${apiUrl}/temp-images`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${adminToken()}`
        //     },
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(result => {

        // gallery.push(result.data.id);
        // setGallery(gallery);

        // galleryImages.push(result.data.image_url);
        // setGalleryImages(galleryImages);

        //         setDisable(false);
        //         e.target.value = "";
        //     })
        try {
            const res = await fetch(`${apiUrl}/temp-images`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const result = await res.json();
            const newGallery = [...gallery, result.data.id];
            setGallery(newGallery);
            const newGalleryImage = [...galleryImages, result.data.image_url];
            setGalleryImages(newGalleryImage);
        } catch (error) {
            console.error('Upload error:', error.message);
            alert('An error occurred while uploading the image: ' + error.message);
        } finally {
            setDisable(false);
            e.target.value = "";
        }
    }

    const deleteImage = (image) => {
        const newGallery = galleryImages.filter(gallery => gallery != image);
        setGalleryImages(newGallery);
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        setGallery([]);
        setGalleryImages([]);
        fetchSizes();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Product / Create</h4>
                        <Link to="/admin/products" className=' btn btn-primary'>Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveProduct)}>
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
                                            tabIndex={1} // tabIndex of textarea
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
                                                    {...register('compare_price')}
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
                                                                const value = +e.target.value;
                                                                if (e.target.checked) {
                                                                    setSizesChecked(prev => [...prev, value]); // add size
                                                                } else {
                                                                    setSizesChecked(prev => prev.filter(id => id !== value)); // delete size
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
                                                galleryImages && galleryImages.map((image, index) => {
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={image} alt='show image' className='w-100' />
                                                            </div>
                                                            <button className='btn btn-danger mt-3 w-100' onClick={() => deleteImage(image)}>delete</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button disabled={disable} type="submit" className="btn btn-primary mt-3 mb-5">
                                {disable ? 'Creating...' : 'Create'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create