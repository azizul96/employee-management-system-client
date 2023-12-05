import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useHr from "../Hooks/useHr";


const HrRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isHr, isHrLoading] = useHr()
    const location = useLocation();


    if(loading || isHrLoading){
        return  <div className=" flex justify-center items-center mt-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
    }
    if(user && isHr){
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace ></Navigate>
}
export default HrRoute;