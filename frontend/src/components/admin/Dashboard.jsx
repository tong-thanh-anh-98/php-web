import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Sidebar from '../common/Sidebar';
import { adminToken, apiUrl } from '../common/http';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${apiUrl}/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    }
                });
                const result = await res.json();
                if (result.status === 200) {
                    setStats({
                        users: result.users,
                        products: result.products
                    });
                } else {
                    toast.error(result.message);
                    console.error('Fetch failed:', result);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Unable to connect to the server. Please try again later.');
            }
        };

        fetchStats();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='card shadow'>
                                    <div className='card-body'>
                                        <h2>{stats.users}</h2>
                                        <span>Users</span>
                                    </div>
                                    <div className='card-footer'>
                                        <a to='/admin/dashboard'>View Users</a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card shadow'>
                                    <div className='card-body'>
                                        <h2>1</h2>
                                        <span>Orders</span>
                                    </div>
                                    <div className='card-footer'>
                                        <a href='/admin/dashboard'>View Orders</a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card shadow'>
                                    <div className='card-body'>
                                        <h2>{stats.products}</h2>
                                        <span>Products</span>
                                    </div>
                                    <div className='card-footer'>
                                        <Link to='/admin/products'>View Products</Link>
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

export default Dashboard