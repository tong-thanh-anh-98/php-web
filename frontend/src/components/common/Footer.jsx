import LogoFooter from '../../assets/images/ecommerce_logo.png';

const Footer = () => {
    return (
        <footer className='py-5 text-white'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 pb-4'>
                        <img src={LogoFooter} alt="" width={150} />
                        <div className='pt-3 pe-5'>Giới thiệu về cửa hàng.</div>
                    </div>

                    <div className='col-md-3 pb-4'>
                        <h2 className='mb-3'>DANH MỤC SẢN PHẨM</h2>
                        <ul>
                            <li>
                                <a href=''>Danh mục 1</a>
                            </li>
                            <li>
                                <a href=''>Danh mục 2</a>
                            </li>
                            <li>
                                <a href=''>Danh mục 3</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col-md-3 pb-4'>
                        <h2 className='mb-3'>LIÊN KẾT</h2>
                        <ul>
                            <li>
                                <a href=''>Login</a>
                            </li>
                            <li>
                                <a href=''>Register</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col-md-3 pb-4'>
                        <h2 className='mb-3'>LIÊN HỆ</h2>
                        <ul>
                            <li>
                                <a href=''>0987.457.830</a>
                            </li>
                            <li>
                                <a href=''>info@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row spotlight py-5'>
                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center pb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
                            </svg>
                            <h3 className='ps-2'>Giao hàng miễn phí</h3>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center pb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
                                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path>
                            </svg>
                            <h3 className='ps-2'>Hoàn tiền theo tiêu chuẩn</h3>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center pb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
                            </svg>
                            <h3 className='ps-2'>Thanh toán an toàn</h3>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 text-center pt-5'>
                        <p> &copy; Website được phát triển năm 2025.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer