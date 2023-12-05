import toast from "react-hot-toast";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const Newsletter = () => {


    const handleNewsletterSubmit = e =>{
        e.preventDefault()
        toast.success('Subscribed');
    }
    return (
        <div className="container mx-auto mt-10">
            <SectionTitle heading="NewsLetter"></SectionTitle>
            <div className="flex flex-col gap-3 mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
                <div className="md:flex md:items-center md:justify-center md:w-1/2  bg-[#264653]">
                    <div className="px-6 py-6 md:px-8 md:py-0">
                        <h2 className="text-lg font-bold text-white dark:text-white ">Sign Up For  Updates</h2>

                        <p className="mt-2 text-sm text-white ">Welcome to our latest newsletter, we invite you to experience Effective tracking of employee training and development programs</p>
                    </div>
                </div>

                <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 gap-1">
                    <form onSubmit={handleNewsletterSubmit}>
                        <div className="flex flex-col p-1.5 overflow-hidden border-2 border-[#fb8500] rounded-lg lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                            <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" required/>

                            <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#fb8500] rounded-md  focus:outline-none">subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;