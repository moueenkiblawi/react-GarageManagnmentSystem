import React from 'react'
import Logo from '../assets/garragelogo.png'
import { NavLink,Link } from 'react-router-dom'
//import ReorderIcon from '@mui/icons-material/Reorder';
import '../../../styles/Header.css'
function header() {

  
  return (
    <div >
 <div className='navbar'>
  <div className='leftSide'>
    <img src={Logo} alt='no img'/>
  </div>

  <div className='rightSide'>
<NavLink to="/">Home</NavLink>
<NavLink to="/about">About Us</NavLink>
<Link to="/contact">Conatct</Link>
<Link to="/services">Service</Link>
<Link to="/login" className='login'><button className='login'>Login</button></Link>
{/* <button>
  <ReorderIcon/>
</button> */}


  </div>
 </div></div>
  )
}


/* <div>
<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
<div className="container-fluid">
  <Link className="navbar-brand" to="/home">Logo</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="mynavbar">
<ul className="navbar-nav me-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/home">Home</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="/about">About Us</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="/contact">Link</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="/services">Services</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to="/login">Login</Link>
  </li>
</ul>

</div>
</div>
</nav>

</div> */
export default header