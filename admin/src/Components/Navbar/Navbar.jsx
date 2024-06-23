import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div>
            <img src={navlogo} alt="" className='nav-logo'/>
            <img src={navProfile} alt='' className='nav-profile'/>
    </div>
  )
}

export default Navbar