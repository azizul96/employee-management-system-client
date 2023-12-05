

const ServiceCard = ({service}) => {
    return (
        <div>
            <div>
                <div className="flex flex-col items-center justify-center ">
                    <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{backgroundImage: `url(${service.image})`}}>
                    </div>

                    <div className="w-56 -mt-5 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 ">
                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800  dark:text-white "></h3>

                        <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
                            <span className="font-bold text-gray-800 dark:text-gray-200">{service.name}</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;