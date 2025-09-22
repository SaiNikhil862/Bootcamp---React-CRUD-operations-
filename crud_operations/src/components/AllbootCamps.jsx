
import React, { useEffect, useState, useContext } from 'react'
import { mycontext } from './GlobalContext'
import{Link} from "react-router-dom"
import Loader from './Loader'
const AllbootCamps = () => {
  const [camps, setcamps] = useState([])
  const { auth, logtoken } = useContext(mycontext)


  // fetch all bootcamps
  const responce = async () => {
    let res = await fetch("https://bootcamp-backend-i157736i1-sai-nikhils-projects-adb845a3.vercel.app/api/v1/bootcamps")
    let dataa = await res.json()
    setcamps(dataa.data) // ✅ store only data array
  }

  useEffect(() => {
    responce()
  }, [])

  // delete bootcamp by id
  const handlesubmit = async (id) => {
    try {
      let res = await fetch(`https://bootcamp-backend-i157736i1-sai-nikhils-projects-adb845a3.vercel.app/api/v1/bootcamps/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${logtoken}`
        },
      })

      let daa = await res.json()
      console.log("Deleted:", daa)

      // update UI after delete
      setcamps((prev) => prev.filter((camp) => camp._id !== id))
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  return (
    <>
      <h1 className='pl-140 pt-10 font-bold text-white'>ALL BOOTCAMPS</h1>
      <section className='w-300 p-5   min-h-screen pb-20  rounded flex flex-wrap gap-18 items-center justify-center '>
       { camps?
        camps.map((ele) => {
          let { _id, name, photo,housing,jobAssistance,jobGuarantee, website,email,description } = ele
          return (
            <div key={_id} className='h-70 w-70 bg-gray-500 rounded flex flex-col gap-4 items-center justify-center'>
              <h3 className='font-bold'>{name}</h3>
              <img className='rounded h-40 w-50' src={photo} alt={name} />
              <Link to="/dashboard/bootcampdetails" state={ele} className='border-2 rounded bg-gray-800 text-white p-2'>
                Learn More
              </Link>
              {auth === "publisher" && (
                <div> 
                <button
                  onClick={() => handlesubmit(_id)}
                  className='border-2 rounded bg-red-600 text-white p-1'
                >
                  Delete
                </button>
                {/* <Link
                  to="/dashboard/updatebootcamp"
                  className='border-2 rounded bg-yellow-600 text-white p-1'
                >
                  edit
                </Link> */}
                </div>
              )}
            </div>
          )
        }): <Loader/> 

      }
      </section>
    </>
  )
}

export default AllbootCamps
