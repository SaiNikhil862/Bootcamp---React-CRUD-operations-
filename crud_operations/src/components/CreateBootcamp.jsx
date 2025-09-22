import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './Login'
import { mycontext } from './GlobalContext'
import {  toast } from 'react-toastify';

function CreateBootcamp() {
    //   let[token,settoken]=useState()
    let { logtoken } = useContext(mycontext)
    let nav = useNavigate()
    let [bootcamp, setBootcamp] = useState({
        name: "",
        email: "",
        description: "",
        website: "",
        careers: "web development",
        address: ""
    })
    let { name, email, address, description, website, careers, photo } = bootcamp

    let handlechange = (e) => {
        let { name, value } = e.target
        setBootcamp({ ...bootcamp, [name]: value })
    }

    let handlesubmit = async (e) => {
        e.preventDefault();
        // 'Authorization': `Bearer ${token}`
        let res = await fetch("http://localhost:5000/api/v1/bootcamps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${logtoken}`
            },
            body: JSON.stringify(bootcamp),
        })
        
        let data = await res.json()
        console.log(data);
        toast.success("Bootcamp Created Successfully")
        nav("/dashboard")
    }
    return (
        <div className="max-w-md mx-auto    text-white p-6 rounded-xl shadow-md bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Create BootCamp</h2>
            <form className="space-y-4" onSubmit={handlesubmit}>
                <input type="text" name='name' value={name} onChange={handlechange} placeholder="Enter name here" className="w-full p-2 border rounded bg-gray-800" />
                <input type="email" name='email' value={email} onChange={handlechange} placeholder="Enter email" className="w-full p-2 border rounded bg-gray-800" />
                <textarea placeholder="Write some description" onChange={handlechange} name='description' value={description} className="w-full p-2 border rounded bg-gray-800"></textarea>
                <input type="url" placeholder="Enter a website" onChange={handlechange} name="website" value={website} className="w-full p-2 border rounded bg-gray-800" />
                <input type="text" name='address' value={address} onChange={handlechange} placeholder="Enter your address" className="w-full p-2 border rounded bg-gray-800" />
                <select name='careers' onChange={handlechange} value={careers} className="w-full p-2 border rounded bg-gray-800">
                    <option value="web development"> web development</option>
                    <option value="react development">react development</option>
                    <option value="fullstack development">fullstack development</option>
                    <option value="java development">java development</option>
                    <option value="python development">python development</option>
                    <option value="android development">android development</option>
                    <option value="ux/ui development">ux/ui development</option>
                    <option value="business">business</option>
                    <option value="others">others</option>
                   
                </select>
                <input type="url" onChange={handlechange} name='photo' value={photo} placeholder="Image URL" className="w-full p-2 border rounded bg-gray-800" />
                <input type='submit' value=" Create BootCamp" className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white  hover:text-white" />


            </form>
        </div>
    );
}

export default CreateBootcamp
