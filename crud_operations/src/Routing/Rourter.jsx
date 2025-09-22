 import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import Register from "../components/Register";
import Login from "../components/Login";
import PrivateRoute from "../helper/PrivateRoute";
import Welcome from "../components/Welcome";
import AllbootCamps from "../components/AllbootCamps";
import CreateBootcamp from "../components/CreateBootcamp";
import UpdateBootcamp from "../components/UpdateBootcamp";
import BootcampDetails from "../components/BootcampDetails";
import CreateCourse from "../components/CreateCourse";
import Threads from "../animations/Threads";
import NotFound from "../components/NotFound";
import LiquideCrome from "../animations/LiquideCrome";
 

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // contains NavBar + <Outlet/>
    children: [
      {
        index: true, // "/"
        element:  <Threads><Welcome /></Threads>,
      },
      {
        path:"register",
        element: <Threads><Register/></Threads>
      },
      {
        path: "login",
        element:<Threads><Login /></Threads> 
      },
      {
        path: "dashboard", // only show after login
        element: <Layout />, // Layout has Sidebar
        children: [
          {
            index: true, // "/dashboard"
            element: <AllbootCamps/>,
          },
          {
            path:"/dashboard/createBootcamp",
            element:<PrivateRoute>
              <CreateBootcamp/>
            </PrivateRoute>
          },{
            path:"/dashboard/updatebootcamp/:id",
            element:<UpdateBootcamp/>
          },
          {
            path:"/dashboard/bootcampdetails",
            element:<BootcampDetails/>
          },
          {
            path:"/dashboard/createcourse",
            element:<CreateCourse/>
          },{
            path:"*",
            element:<NotFound/>
          }
        ],
      },
    ],
  },
]);

export default routes;
