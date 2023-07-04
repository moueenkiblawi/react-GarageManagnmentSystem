import React from 'react'
// import { Link } from 'react-router-dom'
import '../../../styles/Sidebar.css'
import CarRepairIcon from '@mui/icons-material/CarRepair';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import TuneIcon from '@mui/icons-material/Tune';

import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


function WorkerSidebar() {
    const navigate=useNavigate()

        const handleLogout=()=>{
            axios.get('http://localhost:8081/logout')
            .then(res=>{
                navigate('/login')
            })
        }



  return (

 <div className="sidebar">

    <div className="top">
        <span className="logo">CarCare</span>
    </div>
    <hr/>

    <div className="center">
        <ul>
          
                <p className="center-title">LISTS</p>
           
                
                <Link to="/workerDashboard">
                {" "}
            <li>
                <CarRepairIcon className='sidebar-icons'/>
                <span>Car List</span>
                </li></Link>
                <Link to="/worker/AddCar">
            <li>
                <CarRepairIcon className='sidebar-icons'/>
                <span>Add Car</span>
                </li></Link>

              
                <p className="center-title">USER</p>
                
                <Link to="/workerProfile">
            <li>
                <AccountCircleIcon className='sidebar-icons'/>
                <span>Profile</span>
                </li></Link>
              
            <li onClick={handleLogout}>
                <LogoutIcon className='sidebar-icons'/>
                <span>Logout</span>
            
                </li>
         
        </ul>
    </div>
<Outlet/>

 </div>
  )
}

export default WorkerSidebar