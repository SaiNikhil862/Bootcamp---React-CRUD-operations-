import { createContext, useState } from "react";
export let mycontext=createContext()
import React from "react";
let GlobalContext=(props)=>{
let[logtoken,setlogtoken]=useState(undefined)
let [auth,setauth]=useState()

return <mycontext.Provider value={{logtoken,setlogtoken,auth,setauth}}>
 {props.children}
</mycontext.Provider>
}
 
export default GlobalContext