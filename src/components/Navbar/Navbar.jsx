import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import user from "../../assets/images/user.png"
import logout from "../../assets/images/logout.png"
import TemporaryDrawer from './HamburgerMenu'


export default function Navbar(props) {
    const navigate=useNavigate()
  
  const logoutHandler=(event)=>{
event.preventDefault()
window.sessionStorage.removeItem("firstName")
window.sessionStorage.removeItem("lastName")
window.sessionStorage.removeItem("userId")
window.sessionStorage.removeItem("isLogin")
navigate("/login")
  }
    


  return (
    
    <nav className='flex justify-between px-4  items-center bg-white  text-darkBlue  py-1 font-bold text-base   shadow-md'>
        <div className=' gap-3 sm:flex hidden '>
       
           <div>
           <NavLink to="/" className=" p-2 rounded-lg hover:hover:text-mainBlue"> آگهی ها</NavLink>
           </div>
           <div>
           <NavLink to="/my-ad" className=" p-2 rounded-lg hover:hover:text-mainBlue"> آگهی های من</NavLink>
           </div>
           <div>
           <NavLink to="/new-ad" className=" p-2 rounded-lg hover:hover:text-mainBlue">ثبت آگهی</NavLink>
           </div>
        </div>
        <div className='sm:hidden block'>
        <TemporaryDrawer/>
        </div>
        <div className='flex gap-2 justify-end'>
            <div className='flex items-center justify-center'>
                <img  src={user} alt='user'/>
            </div>
            <div className='my-auto space-y-0.5'>
                <div className='px-2 flex gap-0.5 items-center'>
                    <span>{sessionStorage.getItem("firstName")}</span>
                    <span>{sessionStorage.getItem("lastName")}</span>
                </div>
                <div className='text-hasan  '>
                    <button onClick={logoutHandler} >
                        <div className='flex gap-1 text-[#f56a6a]  px-2 py-1 rounded-lg items-center'>
                            <img className='w-1/5 h-1/5' src={logout} alt='logout'/>
                            <span >خروج</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    
  )
}
