import { createBrowserRouter,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import App from "../App.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import Signup from "../pages/Signup.js";
import Dashboard from "../pages/Dashboard.js";
import Message from "../components/Message.js";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element:<Home/>,
                children:[
                    {
                        path: "login",
                        element:<Login/>
                    },
                    {
                        path: "signup",
                        element:<Signup/>
                    },
                ]
            },
            
            {
                path: "dashboard",
                element:<Dashboard/>
            }, 
            {
                path:"dashboard/:id",
                element:<Dashboard/>
            }     
        ]
    }
]);


export default router;