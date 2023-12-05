import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Registration = () => {
    const { register, handleSubmit, } = useForm()
    const axiosPublic = useAxiosPublic()
    const {createUser, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate(null)

    const onSubmit = async(data) =>{
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        
        const name = data.name
        const bankAccount = data.bankAccount
        const salary = data.salary
        const email = data.email
        const password = data.password
        const designation = data.designation
        const image = res.data.data.display_url
        const fired = false
        let status = false
        if(designation == "hr"){
            status = true
        }
        console.log(name,bankAccount,salary,email,password,designation,image);
        if(password.length < 6){
            return toast.error('Password must be 6 characters long ');
        }
        else if(!/[A-Z]/.test(password)){
            return toast.error('Password should have one uppercase character');
        }
        else if(!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)){
            return toast.error('Password should have one special character');
        }
        createUser(email,password)
        .then(() =>{
            updateUserProfile(name, image)
            .then(()=>{ 
                
                const userInfo = {
                    name,
                    bankAccount,
                    salary,
                    email,
                    password,
                    designation,
                    image,
                    status,
                    fired
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    // console.log(res.data);
                if(res.data.insertedId){
                    toast.success('User created successfully');
                    navigate("/")
        
                }
            })
            
            })
        })
        .catch(error =>{
            toast.error(error.message);
        })
        
    }

    return (
        <>
            <Helmet>
                <title>EMS | Registration</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" >
                    <img src="/login.webp" alt="" className="object-cover" />
                </div>

                <div className="w-full px-6 py-5 md:px-8 lg:w-1/2">
                    {/* <div className="flex justify-center mx-auto">
                        <img className="w-20" src="/logo.png" alt=""/>
                    </div> */}

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome !
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Full Name</label>
                            <input type="text"  name="name" {...register("name", { required: true })} 
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" required />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Bank Account No.</label>
                            <input type="number"  name="bankAccount" {...register("bankAccount", { required: true })}
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Salary</label>
                            <input type="number"  name="salary" {...register("salary", { required: true })}
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>
                        
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                            <input type="email"  name="email" {...register("email", { required: true })}
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
                            </div>

                            <input type="password" name="password" {...register("password", { required: true })}
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>
                        <div className="mt-4">
                            <select name="designation" {...register("designation", { required: true })}
                            className="select select-primary w-full block px-4 py-2 text-gray-700" required>
                                <option value="" disabled selected>Designation?</option>
                                <option value="employee">Employee</option>
                                <option value="hr">HR</option>
                                
                                
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-200" >Image</label>
                            
                            <input type="file" name="image" {...register("image", { required: true })}
                            className="file-input file-input-bordered file-input-info block w-full text-gray-700 bg-white border rounded-lg " />
                        </div>
                        
                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#fb8500] rounded-lg hover:bg-[#fb8500] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link to="/login" className="text-sm font-semibold text-[#fb8500] uppercase dark:text-gray-400 hover:underline">or Login</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;