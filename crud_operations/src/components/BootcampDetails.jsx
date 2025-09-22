import React from 'react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { mycontext } from './GlobalContext'
import { useEffect } from 'react'
import { useState } from 'react'
import Threads from '../animations/Threads'


const BootcampDetails = () => {
    let { auth } = useContext(mycontext)
    let loc = useLocation()
    let [courses, setcourses] = useState()

    let response = async () => {
        let res = await fetch(`https://bootcamp-backend-i157736i1-sai-nikhils-projects-adb845a3.vercel.app/api/v1/bootcamps/${loc?.state?._id}/courses`)
        let dataa = await res.json()
        console.log(dataa);
        setcourses(dataa?.data)
    }
    useEffect(
        () => { response() }, []
    )




    return (
        <>
            <section className='minh-h-screen bg-gray-700'>
                {/* <Threads>  */}
                <div className='border- h-150 pt-5  mt-5 w-1/2 m-auto flex flex-col  items-center justify-cenetr gap-5 bg-gray-500'>
                    {/* let { _id, name, photo,housing,jobAssistance,jobGuarantee, website,email,description } = ele */}
                    <h1 className='font-bold rounded p-2 bg-gray-400'>{loc?.state?.name}</h1>
                    <img className='rounded border-2 h-40 w-50' src={loc?.state?.photo} />
                    <h2 className='font-bold '> WEBSITE  :   {loc?.state?.website}</h2>
                    <h2 className='font-bold'>EMAIL  :  {loc?.state?.email}</h2>
                    <p className='font-bold'> DESCRIPTION  :   {loc?.state?.description}</p>
                    <h2 className='font-bold'> JOB ASSISTANCE  :  {loc?.state?.jobAssistance}</h2>
                    <h2 className='font-bold'> JOB GAURENTEE  :  {loc?.state?.jobGuarantee}</h2>
                    <h2 className='font-bold'> HOUSING  :  {loc?.state?.housing}</h2>
                    {
                        auth == "publisher" ? <Link to="/dashboard/createcourse" className='border-2 rounded bg-gray-800 text-white p-2'>
                            create course
                        </Link> : ""
                    }
                    {
                        auth == "publisher" ? <Link    to={`/dashboard/updatebootcamp/${loc?.state?._id}`}  className='border-2 rounded bg-orange-800 text-white p-2 '>
                            update
                        </Link> : ""
                    }
                </div>
                {/* </Threads> */}
                <br /><br />
                <h1 className='font-bold rounded  pl-150 bg-gray-400'>Avaliable courses</h1>

                <div className='border- w-full h-auto p-4 h-130 flex  flex-wrap bg-'>
                    {
                        courses?.map((ele) => {
                            let { title, description, duration, price, minimumSkill, scholarshipAvailable, bootcamp, image } = ele
                            return <div className='h-auto p-4 w-80 bg-gray-200 rounded flex flex-col items-center  gap-4 m-auto '>
                                <h2 className='font-bold'>{title}</h2>
                                <img className='rounded h-40 w-50' src={image} alt={title} />
                                <p className='w-70 font-bold text-center'>{description}</p>
                                <h2 className='font-bold'> DURATION : {duration}</h2>
                                <h2 className='font-bold'>PRICE : {price}</h2>
                                <h2 className='font-bold'> SKILL LEVEL : {minimumSkill}</h2>
                                <h2 className='font-bold'>SCHOLARSHIP : {scholarshipAvailable ? "yes" : "no"}</h2>
                                <br />
                                {
                                    auth == "user" ? <button className='border-2 rounded bg-gray-800 text-white p-2'>Enroll now</button> :
                                      ""
                                }
                            </div>
                        })
                    }
                </div>

            </section>
        </>
    )
}

export default BootcampDetails
