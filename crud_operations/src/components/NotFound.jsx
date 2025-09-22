import React from 'react'
import FuzzyText from '../animations/FuzzyText'

const NotFound = () => {
    return (
        <div className='m-auto pt-30 mt-20 border- h-100 w-120'>


            <FuzzyText >404</FuzzyText>
            <FuzzyText >NOT FOUND</FuzzyText>
            {/* <br />
            <h1 className='text-5xl px-20  text-white text-bold'>NOT FOUND</h1> */}
        </div>
    )
}

export default NotFound
