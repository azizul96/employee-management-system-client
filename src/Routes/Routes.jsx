import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard";
import HrHome from "../Pages/Dashboard/HrHome/HrHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import EmployeeHome from "../Pages/Dashboard/EmployeeHome/EmployeeHome";
import PrivateRoute from "./PrivateRoute";
import EmployeeList from "../Pages/Dashboard/HrHome/EmployeeList/EmployeeList";
import EmployeeDetails from "../Pages/Dashboard/HrHome/EmployeeDetails/EmployeeDetails";
import Error from "../Pages/Error/Error";
import AdminRoute from "./AdminRoute";
import AllEmployee from "../Pages/Dashboard/AdminHome/AllEmployee/AllEmployee";
import EmployeeRoute from "./EmployeeRoute";
import WorkSheet from "../Pages/Dashboard/EmployeeHome/WorkSheet/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/EmployeeHome/PaymentHistory/PaymentHistory";
import HrRoute from "./HrRoute";
import Progress from "../Pages/Dashboard/HrHome/Progress/Progress";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <Error></Error>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/contact",
            element: <Contact></Contact>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registration></Registration>
        },
        

      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // Admin
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'all-employee',
          element: <AdminRoute><AllEmployee></AllEmployee></AdminRoute>
        },
        
        
        // HR
        {
          path: 'hrHome',
          element: <HrRoute><HrHome></HrHome></HrRoute>
        },
        {
          path: 'employee-list',
          element: <HrRoute><EmployeeList></EmployeeList></HrRoute>,
        },
        {
          path: 'progress',
          element: <HrRoute><Progress></Progress></HrRoute>,
        },
        {
          path: 'employee-list/:id',
          element: <HrRoute><EmployeeDetails></EmployeeDetails></HrRoute>,
          loader: ({params})=> fetch(`https://employee-management-server-fawn.vercel.app/users/${params.id}`)
        },
        // Employee
        {
          path: 'employeeHome',
          element: <EmployeeRoute><EmployeeHome></EmployeeHome></EmployeeRoute>
        },
        {
          path: 'work-sheet',
          element: <EmployeeRoute><WorkSheet></WorkSheet></EmployeeRoute>
        },
        {
          path: 'payment-history',
          element: <EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute>
        },


      ]
    }
  ]);