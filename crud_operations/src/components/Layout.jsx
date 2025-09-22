 import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Threads from '../animations/Threads';
function Layout() {
  return (
    <div className="flex min-h-screen ">
      
        <Sidebar />
       
 
      <div className="  w-full min-h-screen m-auto bg-gray-700">
        {/* <Threads> */}
           <Outlet />
        {/* </Threads> */}
        
      </div>
    </div>
  );
}

export default Layout;
