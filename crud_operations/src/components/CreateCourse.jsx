import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { mycontext } from './GlobalContext'
import {  toast } from 'react-toastify';
import { useContext } from 'react';
 
const CreateCourse = () => {
  let nav=useNavigate()
  let{logtoken}=useContext(mycontext)
   let[bootcampp,setBootcampp]=useState()
   const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    minimumSkill: "beginner",
    scholarshipAvailable: false,
    bootcamp: "",  
    image: "",
  });
  let{title,description,duration,price,minimumSkill,scholarshipAvailable,bootcamp,image}=formData
 
   
  let responce=async()=>{
    let res=await fetch("http://localhost:5000/api/v1/bootcamps")
    let dataa= await res.json()
    console.log(dataa.data );
    setBootcampp(dataa?.data)
   
    
  }
  
  useEffect(()=>{
    responce()
  },[])
  
  // console.log(bootcampp);
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((formData) => ({ ...formData,[name]: type === "checkbox" ? checked : value,
    }));
  };

    // console.log(formData);
    
   let handlesubmit = async (e) => {
           e.preventDefault();
            
           let res = await fetch(`http://localhost:5000/api/v1/bootcamps/${formData.bootcamp}/courses`, {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
                   'Authorization': `Bearer ${logtoken}`
               },
               body: JSON.stringify(formData),
           })
           
           let data = await res.json()
           console.log(data);
           toast.success("Bootcamp Created Successfully")
           nav("/dashboard/bootcampdetails")
       }

  
  return (
    <>
       <div className="max-w-md mx-auto  text-white p-6 rounded-xl shadow-md mt-6 bg-black ">
      
      <h2 className="text-2xl font-bold mb-4 text-center">Create Course</h2>
      <form className="space-y-4" onSubmit={handlesubmit}>
        <input type="text" placeholder="Enter title here" onChange={handleChange} name='title' value={title} className="w-full p-2 border rounded bg-gray-800" />
        <textarea placeholder="Write some description" onChange={handleChange} name='description' value={description} className="w-full p-2 border rounded bg-gray-800"></textarea>
        <input type="text" placeholder="Course duration" onChange={handleChange} name='duration' value={duration} className="w-full p-2 border rounded bg-gray-800" />
        <input type="number" placeholder="Price of this course" onChange={handleChange} name='price' value={price} className="w-full p-2 border rounded bg-gray-800" />
        <input type="url" placeholder="Give the image URL" onChange={handleChange} name='image' value={image} className="w-full p-2 border rounded bg-gray-800" />
        <select name='minimumSkill' value={minimumSkill} onChange={handleChange} className="w-full p-2 border rounded bg-gray-800">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
         <select
        name="bootcamp"
        value={bootcamp}
        onChange={handleChange}
       className="w-full p-2 border rounded bg-gray-800"
        required
      >
        <option value="">Select Bootcamp</option>
        {bootcampp?.map((bc) => (
          <option key={bc._id} value={bc._id}>
            {bc.name}
          </option>
        ))}
      </select>
          <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="scholarshipAvailable"
          checked={scholarshipAvailable}
           onChange={handleChange}
        />
        <span className="ml-2">Scholarship Available</span>
      </label>
       
        <input type="submit" value="Create Course" className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white  hover:text-white"/>
           
        
      </form>
    </div>
    </>
  )
}

export default CreateCourse
