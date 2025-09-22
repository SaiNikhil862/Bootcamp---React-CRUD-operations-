 import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";
import { Link } from "react-router-dom"
import {  toast } from 'react-toastify';

function Register() {
  let{auth,setauth}=useContext(mycontext)
    let[fdata,setfdata]=useState({
       name:"",
       email:"",
       password:"",
       role:"user",
       avatar:""
    })
   let{name,email,password,role,avatar}=fdata
  const navigate = useNavigate();

   let handlechange=(e)=>{
    let {name,value}=e.target
    setfdata({...fdata,[name]:value})
   }

  const handleRegister = async(e) => {
    // register logic...
    e.preventDefault()
    console.log(fdata);
    navigate("/login");

    let res=await fetch("http://localhost:5000/api/v1/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(fdata),
       })
    // console.log(res);
    let result=await res.json()
    console.log(result);
    setauth(result?.user?.role)

    
    // console.log(result);
    toast.success("registred successfully....")
    
  
  };

  return (
    <>
    
       <div className=" w-100 mx-150  text-white p-6  mt-10 rounded-xl shadow-md mt-9 bg-black absolute ">
      <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" onChange={handlechange} value={name} name="name" placeholder="Enter name" required className="w-full p-2 border rounded bg-gray-500" />
        <input type="email" onChange={handlechange} value={email} name="email" placeholder="Enter email" required className="w-full p-2 border rounded bg-gray-500" />
        <input type="password" onChange={handlechange} value={password} name="password" placeholder="Enter password" required className="w-full p-2 border rounded bg-gray-500" />
        <select  name="role" onChange={handlechange} value={role} required className="w-full p-2 border rounded bg-gray-500">
          <option name="user" >user</option>
          <option name="publisher">publisher</option>
        </select>
        <input type="url" name="avatar"  placeholder="Enter avatar URL" className="w-full p-2 border rounded bg-gray-500" />
        <input type="submit" value="Register"  className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white"/>
          
        
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-red-200 cursor-pointer">Login</Link>
      </p>
    </div>
      
    </>
  );
}

export default Register;
