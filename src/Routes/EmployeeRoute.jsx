import { Navigate, useLocation } from "react-router-dom";
import useEmployee from "../Hooks/useEmployee";
import useAuth from "../Hooks/useAuth";


const EmployeeRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isEmployee, isEmployeeLoading] = useEmployee()
    const location = useLocation();


    if(loading || isEmployeeLoading){
        return  <div className=" flex justify-center items-center mt-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
    }
    if(user && isEmployee){
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace ></Navigate>
};

export default EmployeeRoute;