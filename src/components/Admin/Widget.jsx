import React, { useEffect } from 'react'
import '../../styles/Widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Widget({type}) {
  const [adminCount, setAdminCount] = React.useState()
  const [workerCount, setWorkerCount] = React.useState()
  const [carCount, setCarCount] = React.useState()
  const [salary, setSalary] = React.useState()
useEffect(()=>{
  axios.get('http://localhost:8081/adminCount')
  .then(res=>{
    setAdminCount(res.data[0].admin)
  })


axios.get('http://localhost:8081/workerCount')
.then(res=>{
  setWorkerCount(res.data[0].user)})

axios.get('http://localhost:8081/CarCount')
.then(res=>{
  setCarCount(res.data[0].car)})

axios.get('http://localhost:8081/salary')
.then(res=>{
  setSalary(res.data[0].cost)})


})





const diff=20;

let data;
switch(type){
  case "admin":
    data={
      title:"ADMIN",
      isMoney:false,
      amount:adminCount,
      link:"All admin",
      href:'/worker',

      icon:(
        <PersonOutlineIcon className='icon' 
        style={
          {
            color:"crimson",
            backgroundColor:"rgba(255,0,0,0.2)"
          }
        }/>      )
    };
    
    break;

  case "user":
    data={
      title:"USERS",
      isMoney:false,
      amount:workerCount,
      link:"All users",
      href:'/worker',
      icon:(
        <PersonOutlineIcon className='icon'
        style={
          {
            color:"black",
            backgroundColor:"rgba(0,128,0,0.2)"
          }
        }/>  
      )
    };
    
    break;

  case "car":
    data={
      title:"Cars",
      isMoney:false,
      amount:carCount,
      
      link:" All Cars",
      href:'/carList',
      icon:(
        <CarRepairIcon className='icon'
        style={
          {
            color:"green",
            backgroundColor:"rgba(0,128,0,0.2)"
          }
        }/>  
      )
    };
   
    break;

  case "balance":
    data={
      title:"Earning",
      isMoney:true,
      link:"See details",
         href:'/client',

      amount:salary,

      icon:
        <MonetizationOnIcon className='icon'
        style={
          {
            color:"purple",
            backgroundColor:"rgba(128,0,128,0.2)"
          }
        }/>  
      
    };
    break;
    default:
    break;

}


  return (

    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"}{data.amount}</span>
            <Link to={data.href}>
            <span className="link">{data.link}</span>
            </Link>
        </div>
        <div className="right">
            <div className="percentage-positive"><KeyboardArrowUpIcon/>
            {diff}%</div>
        <div className='widget-icon'>{data.icon}</div>
          </div>
        </div>
  )
}

export default Widget