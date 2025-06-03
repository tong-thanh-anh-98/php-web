import { useContext, useState } from 'react';
import Layout from './common/Layout';
import { apiUrlFront } from './common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from './context/UserAuthContext';

const Login = () => {
    const { login } = useContext(UserAuthContext);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setDisable(true);
        try {
            const response = await fetch(`${apiUrlFront}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.status === 200) {
                const userInfo = {
                    id: result.id,
                    name: result.name,
                    token: result.token,
                };

                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                login(userInfo);
                toast.success(result.message || 'Login successful!');
                navigate('/account');
            } else {
                // Handling errors returned from the server
                toast.error(result.message || 'Login failed. Please check your credentials.');
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
                                <h3 className="text-center mb-3">Login</h3>

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
                                    {disable ? 'Logging in...' : 'Login'}
                                </button>

                                <div className='d-flex justify-content-center pt-4 pb-2'>
                                    Don't have an account? &nbsp;
                                    <Link to='/account/register'>Register</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login