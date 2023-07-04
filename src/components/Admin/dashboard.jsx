import React, { useEffect } from 'react'
import Sidebar from "../Layout/partials/Sidebar"
import '../../styles/dashboard.css'
import Featured from './featured'
import Chart from './chart'
import Table from '../Layout/partials/table'
import { Box } from 'grommet';

import Widget from './Widget' 
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
function Dashboard() {
const navigate=useNavigate()
axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8081/Auth')

    .then(res=>{
      if(res.data.Status==="Success"){

      }else{
        navigate('/login')
      }
    })
  })
  return (
    <div className='home-sidebar'>
      <Sidebar/> 
    <div className="homeContainer">
    
    <div className='Widgets'>
 <Widget type="admin" />
  <Widget type="user"/>
  <Widget type="car"/>
  <Widget type="balance"/>

</div>

<div className='charts'>
  <Featured/>
  <Chart/>
</div>
<div className="listContainer">
  <div className="listTitle">Latest transactions</div>
  <Box margin={{ top: 'medium' }}>
          <Box
            background="light-4"
            pad="medium"
            round="small"
            border={{ color: 'dark-3', size: 'xsmall' }}
          >
            <Table />
          </Box>
        </Box>
</div>

</div>
</div>
  )
}

export default Dashboard