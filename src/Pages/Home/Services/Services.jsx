
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ServiceCard from "../../../Components/ServiceCard/ServiceCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const Services = () => {
    const axiosPublic = useAxiosPublic()

    const {data: services = [], } = useQuery({
        queryKey: ['services'],
        queryFn: async() =>{
            const res = await axiosPublic.get("/services")
            console.log(res.data);
            return res.data
        }
        
    })

    return (
        <div className="container mx-auto">
            <SectionTitle heading="Services"></SectionTitle>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
                {
                   services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>) 
                }
            </div>
        </div>
    );
};

export default Services;