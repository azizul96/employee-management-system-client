import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useHr from "../../../Hooks/useHr";
import useEmployee from "../../../Hooks/useEmployee";
import { FaAddressBook, FaDashcube, FaHome, FaOutdent, FaSignInAlt } from "react-icons/fa";


const Navbar = () => {
    const {user, userLogOut} = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isHr] = useHr()
    const [isEmployee] = useEmployee()

    const handleLogout = ()=>{
        userLogOut()
    }
    const menu = (
        <>
        
            <NavLink to="/" className={({ isActive, isPending }) =>
                isActive ? " rounded-lg  text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2 flex items-center gap-1"><FaHome/>Home</li>
            </NavLink>

            <NavLink to="/contact" className={({ isActive, isPending }) =>
                isActive ? " text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2 flex items-center gap-1"><FaAddressBook/>Contact</li>
            </NavLink>
            <NavLink to="/contact" className={({ isActive, isPending }) =>
                isActive ? " text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2 flex items-center gap-1"><FaOutdent/>About </li>
            </NavLink>

            {
                isAdmin && 
                <NavLink to="/dashboard/adminHome" className={({ isActive, isPending }) =>
                isActive ? "text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2">Dashboard</li>
                </NavLink>
            }
            {
                isHr && 
                <NavLink to="/dashboard/hrHome" className={({ isActive, isPending }) =>
                isActive ? "text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2">Dashboard</li>
                </NavLink>
            }
            {
                isEmployee && 
                <NavLink to="/dashboard/employeeHome" className={({ isActive, isPending }) =>
                isActive ? "text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2">Dashboard</li>
                </NavLink>
            }
            {
                !isAdmin && !isHr && !isEmployee && 
                <NavLink to="/dashboard" className={({ isActive, isPending }) =>
                isActive ? "text-white underline" : isPending ? "pending" : "text-white"}>
                <li className="font-semibold px-3 py-2 flex items-center gap-1"><FaDashcube/>Dashboard</li>
                </NavLink>
            }
        
            
        </>
)
    return (
        <div className="bg-[#fb8500] ">
            <div className="navbar container mx-auto py-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#fb8500] rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <Link to='/' className=" flex justify-center items-center gap-2 ">
                        <img className="w-20 h-" src="/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu-horizontal px-1 gap-3">
                        {menu}
                    </ul>
                </div>
                <div className="navbar-end">
                    
                    <div className="">
                        {user?.email?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className=" w-10 rounded-full">
                                        <img src={user?.photoURL ? user.photoURL: "/user.png"} alt="" />
                                    </div>
                                    
                                </label>
                                
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <button className="btn btn-sm  btn-ghost">{user.displayName}</button>

                                    </li>
                                    <li>
                                        <button onClick={handleLogout}  className="btn btn-sm  btn-outline  uppercase rounded-lg ">Logout</button>
                                    </li>
                                </ul>
                                
                            </div>
                            :
                            <Link to='/login'>
                                <button className="btn btn-sm  btn-outline font-bold text-white rounded-sm"><FaSignInAlt/>Login</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;