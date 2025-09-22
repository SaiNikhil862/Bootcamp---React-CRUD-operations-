import React, { useContext } from 'react'
import {Link } from "react-router-dom"
import { mycontext } from './GlobalContext'
const Sidebar = () => {
  let {auth}=useContext(mycontext)
  return (
    <>
       <div className="w-50 min-h-screen bg-gray-700 text-white p-6 flex flex-col ">
        <Link  className='border- p-3 bg-gray-800 rounded' to="">All bootcamps</Link><br /> <br />
        {  auth=="publisher"?
        <Link  className='border- rounded  bg-gray-800 p-3' to="/dashboard/createBootcamp">Createbootcamps</Link>:""
           } 
            <br /><br />
            {  auth=="publisher"?
        <Link  className='border- w-full  rounded  bg-gray-800 p-3' to="/dashboard/createBootcamp">UpdateBootcamps</Link>:""
           } 
           <br /><br />
            {  auth=="publisher"?
        <Link  className='border- w-full rounded bg-gray-800  p-3' to="/dashboard/createBootcamp">Create Courses</Link>:""
           } 
           <br /><br />
            {  auth=="publisher"?
        <Link  className='border- rounded bg-gray-800 p-3' to="/dashboard/createBootcamp">Update Course</Link>:""
           } 


       </div>
 
     
    
    </>
  )
}

export default Sidebar
