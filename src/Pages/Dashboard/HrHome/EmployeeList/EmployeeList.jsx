import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserCheck, FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";
import DashboardTitle from "../../../../Components/DashboardTitle/DashboardTitle";
import { Helmet } from "react-helmet-async";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const EmployeeList = () => {
    
    const axiosSecure = useAxiosSecure()
    const {data: employees =[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users`)
            const filterEmployee = res.data.filter(employee => employee.designation === 'employee')
            return filterEmployee
        }
    })
    const handleVerified = employee =>{
        axiosSecure.patch(`/users/hr/${employee._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success('Status Updated !')
            }
        })
    }
    
    return (
        <div>
            <Helmet>
                <title>Employee-List</title>
            </Helmet>
            <DashboardTitle heading="Employee-List"></DashboardTitle>
            <div className="overflow-x-auto rounded-md">
                <table className="table ">
                    {/* head */}
                    <thead className="bg-orange-300">
                    <tr>
                        
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Bank Account</th>
                        <th>Salary</th>
                        <th>Pay</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map((employee, index) => <tr key={employee._id}>
                            
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={employee.image} alt="image" />
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>
                                {employee.name}
                            </td>
                            <td>
                                {employee.email}
                            </td>
                            <td>
                                {
                                    employee.status === false ? 
                                    <button onClick={()=> handleVerified(employee)} className="btn btn-ghost btn-sm text-red-700 text-2xl"><FaXmark /></button>
                                    :
                                    <button onClick={()=> handleVerified(employee)} className="btn btn-ghost btn-sm text-green-700 text-2xl"><FaUserCheck /></button>   
                                }
                            </td>
                            <td>
                                {employee.bankAccount}
                            </td>
                            <td>
                                ${employee.salary}
                            </td>
                            <td>
                                {
                                    employee.status == false ? <button className="btn btn-error text-white btn-sm " disabled >Pay</button> 
                                    :
                                    <button onClick={()=>document.getElementById(index).showModal()} 
                                    className="btn btn-error text-white btn-sm">Pay</button>
                                }
                                {/* modal */}
                                <dialog id={index} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <p className="text-center font-bold mb-5">Salary: ${employee.salary}</p>
                                    
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm employee={employee}></PaymentForm>
                                        </Elements>
                                        
                                    <div className="modal-action">

                                        <form method="dialog">
                                            <button className="btn btn-sm text-white btn-neutral">Close</button>
                                        </form>
                                    </div>
                                </div>
                                </dialog>
                            </td>
                            <td>
                                <Link to={`details/${employee._id}`}>
                                <button className="btn btn-primary btn-sm text-white ">Details</button>
                                </Link>
                            </td>
                        </tr>)
                    }
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;