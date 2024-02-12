import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Newsletter from "./Newsletter/Newsletter";
import Services from "./Services/Services";
import Testimonials from "./Testimonials/Testimonials";
import Portfolio from "./Portfolio/Portfolio";


const Home = () => {
    return (
        <div className="space-y-10">
            <Helmet>
                <title>EMS | Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
            <Portfolio></Portfolio>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;