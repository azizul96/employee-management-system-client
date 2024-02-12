import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaCheck } from "react-icons/fa6";



const Banner = () => {
  return (
    <Carousel className="bg-[#fb8500] ">
      <div className=" container mx-auto">
        <div className=" flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
              <div className=" text-start">
                  <h1 className="text-3xl font-semibold tracking-wide text-white dark:text-white lg:text-3xl">Empowering HR, Elevating<br /> Employee Experiences.</h1>
                  
                  <div className="grid gap-6 mt-8 grid-cols lg:justify-start text-white">
                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Reduction in manual, time-consuming HR tasks.</span>
                      </div>

                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Streamlined processes for onboarding, offboarding</span>
                      </div>

                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Positive feedback from employees</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
              <img className="object-cover w-full h-full max-w-2xl rounded-box " src="/banner1.jpg" alt="glasses photo"/>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <div className="flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center ">
          <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg text-start ">
                  <h1 className="text-3xl font-semibold tracking-wide text-white dark:text-white lg:text-3xl">Smart Workforce Solutions <br />for Smarter Businesses.</h1>
                  
                  <div className="grid gap-6 mt-8 grid-cols lg:justify-start text-white">
                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Timely and constructive performance feedback</span>
                      </div>

                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Improved internal communication and collaboration.</span>
                      </div>

                      <div className="flex items-center text-white -px-3 ">
                        <p className="font-bold text-2xl"><FaCheck /></p>
                        <span className="mx-3">Smooth onboarding experiences for new hires.</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2 ">
              <img className="object-cover w-full h-full max-w-2xl rounded-box " src="/banner2.jpg" alt="glasses photo"/>
          </div>
        </div>
      </div>
      
    </Carousel>
  );
};

export default Banner;
