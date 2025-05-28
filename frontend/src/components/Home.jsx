import FeaturedProducts from './common/FeaturedProducts';
import Hero from './common/Hero';
import Layout from './common/Layout';
import LatestProducts from './common/LatestProducts';

const Home = () => {
    return (
        <>
            <Layout>
                <Hero />
                <LatestProducts />
                <FeaturedProducts />
            </Layout>
        </>
    )
}

export default Home