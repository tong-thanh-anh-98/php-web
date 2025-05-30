import { useState } from 'react';
import Layout from './common/Layout';
import { apiUrlFront } from './common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setDisable(true);
        try {
            const response = await fetch(`${apiUrlFront}/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok && result.status === 200) {
                toast.success(result.message);
                navigate('/account/login');
            } else {
                const formErrors = result.errors;
                Object.keys(formErrors).forEach((field) => {
                    setError(field, { type: 'server', message: formErrors[field][0] });
                });
                toast.error('Please correct the errors in the form.');
            }
        } catch (error) {
            // Troubleshooting due to network loss, system errors...
            console.error('Login failed:', error);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setDisable(false);
        }
    };

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <div className='row'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card shadow border-0 login'>
                            <div className='card-body p-4'>
                                <h3 className="text-center mb-3">Register</h3>

                                <div className='mb-3'>
                                    <label htmlFor='' className='form-label'>Name</label>
                                    <input
                                        {...register("name",
                                            { required: "The name field is required." }
                                        )}
                                        type='text'
                                        className={`form-control ${errors.name && 'is-invalid'}`}
                                        placeholder='Enter name.' />
                                    {
                                        errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                    }
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='' className='form-label'>Email</label>
                                    <input
                                        {
                                        ...register('email', {
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })
                                        }
                                        type='text'
                                        className={`form-control ${errors.email && 'is-invalid'}`}
                                        placeholder='Enter email.' />
                                    {
                                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                    }
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='' className='form-label'>Password</label>
                                    <input
                                        {...register("password",
                                            { required: "The password field is required." }
                                        )}
                                        type='password'
                                        className={`form-control ${errors.password && 'is-invalid'}`}
                                        placeholder='Enter password.' />
                                    {
                                        errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                    }
                                </div>

                                {/* <button className='btn btn-secondary'>Register</button> */}
                                <button disabled={disable} type="submit" className="btn btn-secondary w-100">
                                    {disable ? 'Registering...' : 'Register'}
                                </button>

                                <div className='d-flex justify-content-center pt-4 pb-2'>
                                    Already have an account? &nbsp;
                                    <Link to='/account/login'>Login</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register