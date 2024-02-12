import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";
import Navbar from "../Components/Shared/Navbar/Navbar";
import { FaDollarSign, FaList, FaUser } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useHr from "../Hooks/useHr";
import useEmployee from "../Hooks/useEmployee";
import { FaChartPie, FaSheetPlastic } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";



const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isHr] = useHr()
    const [isEmployee] = useEmployee()
    return (
        <div className="">
            <Helmet>
                <title>EMS | Dashboard</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="flex flex-col md:flex-row  gap-2 ">
                <div className=" h-auto md:w-56  md:h-screen bg-[#fb8500] ">
                    <ul className="menu p-6 space-y-1 text-white font-semibold">
                        {
                            isAdmin && 
                            <>
                            <li><NavLink to="/dashboard/adminHome"><FaUser /> Admin</NavLink></li>
                            <li><NavLink to="/dashboard/all-employee"><FaList /> All Employee </NavLink></li>
                            
                            </>
                        }
                        { 
                            isHr && 
                            <>
                            <li><NavLink to="/dashboard/hrHome"><FaUser /> HR</NavLink></li>
                            <li><NavLink to="/dashboard/employee-list"><FaList /> Employee List </NavLink></li>
                            <li><NavLink to="/dashboard/progress"><FaChartPie /> Progress </NavLink></li>
                            </>
                        }
                        { 
                            isEmployee && 
                            <>
                            <li><NavLink to="/dashboard/employeeHome"><FaUser /> Employee</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history"><FaDollarSign /> Payment History </NavLink></li>
                            <li><NavLink to="/dashboard/work-sheet"><FaSheetPlastic /> Work Sheet </NavLink></li>
                            </>
                        }
                        
                    </ul>
                </div>
                <div className="flex-1 px-5 mt-5">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;