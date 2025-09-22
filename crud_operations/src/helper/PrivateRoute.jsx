import React, { useContext } from 'react'
import { mycontext } from '../components/GlobalContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
    let {auth}=useContext(mycontext)
  return (
    <>
       {
        auth=="publisher"?<>{props.children}</>:<Navigate to="/login" />
       }
    </>
  )
}

export default PrivateRoute
