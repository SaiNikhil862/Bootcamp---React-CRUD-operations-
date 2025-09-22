import React from 'react'
import { Link } from "react-router-dom"

import BlurText from '../animations/BlurText';
const Welcome = () => {
  return (
    <>

      <section className=" h-[755px] w- items-center justify-center  mx-90 absolute">



        <div className="text-white pt-25">
          <BlurText
            className="text-5xl w-100 font-bold mb-4"
            text="Welcome to BootCamp Portal!"
            delay={150}
            animateBy="words"
            direction="top"
          />
           <BlurText
            className="text-2xl w-100  mb-4"
            text="Learn, Build, and Grow with modern technologies"
            delay={150}
            animateBy="words"
            direction=""
          />
          <br />
          <Link to="/login" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
            Get Started
          </Link>
        </div>

      </section>

    </>
  )
}

export default Welcome
