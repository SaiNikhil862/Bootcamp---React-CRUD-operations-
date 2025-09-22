 import { useContext } from "react";
 import{mycontext} from "../components/GlobalContext"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
 

const NavBar = () => {
 
  const location = useLocation();
  const navigate = useNavigate();
  let{logtoken,setlogtoken}=useContext(mycontext)
  const handleLogout = () => {
    setlogtoken(undefined)
    navigate("/login");
  };

  return (
    <div className="h-20 w-full flex items-center justify-between px-10 text-white bg-gray-700">
      <h1 className="text-2xl font-bold">CRUD</h1>

      <div className="flex gap-10">
        {/* {!isLoggedIn && location.pathname !== "/register" && ( */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? " font-semibold" : "hover:text-gray-300"
            }
          >
            Register
          </NavLink>
        {/* )} */}

        {logtoken==undefined?(
            <NavLink
              to="/login"
              // className={({ isActive }) =>
              //   isActive
              //     ? "text-yellow-400 font-semibold"
              //     : "hover:text-gray-300"
              // }
            >
              Login
            </NavLink>
          
        ) : (
          <button onClick={handleLogout} className="hover:text-gray-300">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
