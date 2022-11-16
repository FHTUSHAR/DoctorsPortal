import { createBrowserRouter } from "react-router-dom";
import Main from "../../../layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
import Register from "../../Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
]);