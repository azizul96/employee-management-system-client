import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        fetch('/review.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, [])
    return (
        <div className="container mx-auto">
            <SectionTitle heading="Testimonials"></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <div className="my-5 mx-24 text-center space-y-3">
                            <div className=" flex justify-center items-center">
                                <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                                />
                            </div>
                            <p>{review.comment}</p>
                            <h3 className="font-semibold text-orange-500 text-lg">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;