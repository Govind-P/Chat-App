import { createBrowserRouter,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import App from "../App.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import Signup from "../pages/Signup.js";
import Dashboard from "../pages/Dashboard.js";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element:<Home/>
            },
            {
                path: "login",
                element:<Login/>
            },
            {
                path: "signup",
                element:<Signup/>
            },
            {
                path: "dashboard",
                element:<Dashboard/>
            },      
        ]
    }
]);


export default router;