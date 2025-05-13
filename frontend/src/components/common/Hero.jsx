import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import SliderOneImg from '../../assets/images/img_color1.jpg';
import SliderTwoImg from '../../assets/images/img_color2.jpg';
import SliderThreeImg from '../../assets/images/img_color.jpg';

const Hero = () => {
    return (
        <section className='section-1'>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={{
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }}
            >
                <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SliderOneImg})` }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SliderTwoImg})` }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SliderThreeImg})` }}></div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero