import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from './common/Sidebar'
import UserSidebar from './common/UserSidebar'

const Profile = () => {
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>My Account</h4>
                        {/* <Link to="" className=' btn btn-primary'>Button</Link> */}
                    </div>
                    <div className='col-md-3'>
                        <UserSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='card shadow'>
                            <div className='card-body p-4'>
                                <h3 className="border-bottom pb-3">User Details</h3>
                                <form action="">
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="Name" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="email" className="form-control" placeholder="Email" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <textarea className="form-control" rows={5} placeholder="Address"></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="City" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="District" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="Zip Code" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile