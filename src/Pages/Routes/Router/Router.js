import { createBrowserRouter } from "react-router-dom";
import Main from "../../../layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import Dashboard from "../../../layout/Dashboard";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
import Register from "../../Register/Register";
import MyAppointment from "../../Dashboard/MyAppointment/MyAppointment";
import PrivateRoute from "../PrivateRoute";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Dashboard/Payment/Payment";
import ErrorElement from "../../Shared/ErrorElement/ErrorElement";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>

            },
            {
                path: '/register',
                element: <Register></Register>

            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => {
                    return fetch(`https://doctors-portal-server-lime-nu.vercel.app/bookings/${params.id}`)
                }
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/manageDoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            }
        ]
    }
]);