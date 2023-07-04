import React, { useEffect, useState } from 'react'
import '../../styles/featured.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
function Featured() {

  const [service_cost,setCost]=useState()
  const [value,setValue]=useState()


  useEffect(() => {
    axios.get(`http://localhost:8081/service-cost`)
      .then(res => {
        if(res.data.totalSales>0){
        setCost(res.data.totalSales);
      setValue(20)}
        else{
          setCost(0);
          setValue(0)
        }
      })
      
  
  
  
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  return (
    <div className='featured'>
        <div className="featured-top">
            <h1 className='featured-title'>Total Revenue</h1>
            <MoreVertIcon fontSize='small'/>
        </div>
        <div className="featured-bottom">
        <div className="featuredChart">
            <CircularProgressbar value={value} text={value+"%"} strokeWidth={5} />
        </div>
        <p className="featured-title"> Total sales made today</p>
        <p className="amount">${service_cost}</p>
        <p className="desc">Previous transactions processing. Last payments may not be included</p>
        </div>
        
    </div>
  )
}

export default Featured