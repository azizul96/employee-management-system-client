import useAuth from "../../../Hooks/useAuth";

const HrHome = () => {
    const {user} = useAuth()
    
    return (
        <div>
            <h2 className="text-3xl font-semibold text-end text-[#fb8500]">
                <span>Hi Welcome </span> 
                {
                    user?.displayName ? user.displayName : "Back"
                }
            </h2>
            <div className="w-full  px-8 py-4 mt-16 rounded-lg shadow-lg dark:bg-gray-800 mx-auto bg-[#264653]">
                <div className="flex justify-center -mt-16 md:justify-start">
                    <img className="object-cover w-20 h-20 border-2 border-[#8a50fb] rounded-full "src={user.photoURL} alt="avatar" />
                </div>

                <div className="flex justify-start mt-4">
                    <p className="font-semibold text-white text-xl"> Greetings, {user.displayName}! <br />Welcome to the command center of human capital. Navigate the HR Dashboard with confidence, and lets embark on a journey of fostering a thriving workplace!</p>
                </div>
            </div>
        </div>
    );
};

export default HrHome;