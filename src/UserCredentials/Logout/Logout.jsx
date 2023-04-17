import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function Logout() {
    const Navigate =useNavigate()
    useEffect(()=>{
       localStorage.clear();
       sessionStorage.clear()
       Navigate("/login")
    },[])
  return (
    <div>
         
    </div>
  )
}

export default Logout