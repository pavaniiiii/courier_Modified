import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import LogoutIcon from '@mui/icons-material/Logout';


export default function Header() {
  return (
    <div className='header-container'>
        <div className="logo">
        <a href='/'><img src='https://i.pinimg.com/originals/b6/6e/d3/b66ed34440a266b3ab2db964193d6332.jpg' className='logo-img' /></a> 
        </div>
        <div className="main">
          <ul className="list">
            <li className="list-items"><Link to={"/"}>Home</Link></li>
            <li className="list-items"> <Link to={"/tracking"}>Tracking</Link></li>
            <li className="list-items"> <Link to={"/action"}>Action</Link></li>
            <li className="list-items"> <Link to={"/login"}>Login</Link></li>
          </ul>  
          </div>
          <div className="profile-logo"> <Link to={"/logout"}><LogoutIcon fontSize='large' color='primary' className='profile-icon' /> </Link></div>
    </div>
  )
}
