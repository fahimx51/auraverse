import FeaturedProducts from '../components/FeaturedProducts';
import Hero from '../components/Hero';

function Home() {
    return (
        <div className="my-2">
            <Hero />
            <FeaturedProducts />
        </div>
    )
}

export default Home