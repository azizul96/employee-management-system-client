import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MdDelete } from "react-icons/md";


const AllEmployee = () => {
    const axiosSecure = useAxiosSecure()
    const {data: employees =[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users`)
            const filterVerifiedEmployee = res.data.filter(employee => employee.status === true)
            return filterVerifiedEmployee
        }
    })
    const [gridView, setGridView] = useState(true);
    const handleToggleView = () => {
        setGridView((prev) => !prev);
    };

    const handleMakeHR = id =>{
        axiosSecure.patch(`/users/admin/${id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success("Converted into HR!")
                refetch()
            }
        })
    }

    const handleFire = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to fire !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire!"
          }).then((result) => {
            if (result.isConfirmed) {

            axiosSecure.patch(`/users/fired/${id}`)
            .then(res =>{
                console.log(res.data);
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Fired!",
                        text: "Employee has been Fired.",
                        icon: "success"
                    });
                    refetch()
                }
                
            })
            }
          });
    }
    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          }).then((result) => {
            if (result.isConfirmed) {

            axiosSecure.delete(`/users/${id}`)
            .then(res =>{
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee data has been Deleted.",
                        icon: "success"
                    });
                    refetch()
                }
                
            })
            }
          });
    }
                    
    return (
        <div>
            <Helmet>
                <title>All Employee</title>
            </Helmet>
            <div>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleToggleView}
                        className="btn btn-primary text-white btn-sm"
                    >
                        {gridView ? "Switch to Table View" : "Switch to Grid View"}
                    </button>
                </div>

                {gridView ?
                    (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  px-2">
                        { employees.map(employee => (
                        <div key={employee._id} className="w-full  px-8 py-4 mt-16 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <div className="flex justify-center -mt-16 md:justify-end">
                                <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={employee.image}/>
                            </div>
                
                            <h2 className="mt-2 text-md font-semibold text-gray-800 dark:text-white md:mt-0"><span className="text-sm text-[#fb8500]">Name:</span> {employee.name}</h2>
                            <h2 className="mt-2 text-md font-semibold text-[#023047] dark:text-white md:mt-0"><span className="text-sm text-[#fb8500]">Designation:</span> <span className="uppercase">{employee.designation}</span></h2>
                
                                            
                
                            <div className="flex justify-between mt-4">
                                <div>
                                    {
                                        employee.designation == "employee" ? <button onClick={()=>handleMakeHR(employee._id)} className="btn btn-primary text-white btn-sm px-3 rounded-full shadow-lg" >Make HR</button>
                                        : <span className="text-2xl text-green-500 text-center"><FaUserCheck /></span>
                                    }
                                </div>
                                <div>
                                    {
                                        employee.fired === false ? 
                                        <button onClick={()=>handleFire(employee._id)} className="btn btn-error btn-sm px-3 rounded-full shadow-lg text-white ">Fire</button>
                                        : <span className="font-bold text-lg text-red-500">Fired</span>
                                    }
                                </div>
                                <div>
                                    <button onClick={()=>handleDelete(employee._id)} className="btn btn-ghost btn-sm text-2xl text-red-600 "><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                        ))

                        }
                    </div>)
                :
                    (<div className="overflow-x-auto rounded-md">
                        <table className="table ">
                            {/* head */}
                            <thead className="bg-orange-300">
                            <tr>
                                
                                <th className="text-center">Image</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Designation</th>
                                <th className="text-center">Make HR</th>
                                <th className="text-center">Fire</th>
                                <th className="text-center">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                employees.map(employee => <tr key={employee._id}>
                                    
                                    <td className="text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={employee.image} alt="image" />
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="text-center">
                                        {employee.name}
                                    </td>
                                    <td className=" uppercase text-center">
                                        {employee.designation}
                                    </td>
                                    
                                    <td className="text-center">
                                        {
                                        employee.designation == "employee" ? <button onClick={()=>handleMakeHR(employee._id)} className="btn btn-primary text-white btn-sm px-3 rounded-full shadow-lg" >Make HR</button>
                                            : <button className="btn btn-ghost btn-sm text-2xl text-green-500 text-center px-3 rounded-full">
                                                <FaUserCheck />
                                            </button>
                                        }
                                    </td>
                                    <td className="text-center">
                                    {
                                        employee.fired === false ? 
                                        <button onClick={()=>handleFire(employee._id)} className="btn btn-error btn-sm px-3 rounded-full shadow-lg text-white ">Fire</button>
                                        : <span className="font-bold text-lg text-red-500">Fired</span>
                                    }
                                    </td>
                                    <td className="text-center">
                                        <button onClick={()=>handleDelete(employee._id)} className="btn btn-ghost btn-sm text-2xl text-red-600 "><MdDelete /></button>
                                    </td>
                                </tr>)
                            }
                            </tbody>
                            
                        </table>
                    </div>)}
            </div>
        </div>
    );
};

export default AllEmployee;