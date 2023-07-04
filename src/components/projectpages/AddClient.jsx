import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function AddClient({type}) {
    const navigate=useNavigate()

    function handleChange(){
navigate(data.link)
    }
        
let data;
switch(type){
  case "admin":
        data={
        title:"ADMIN",
        link:"/addWorker"
            };
    
    break;

  case "user":
        data={
        title:"USERS",
        link:"/worker/addCar"
        };
    
    break;
    default:
    break;}
  return (
    <div>
       
        <Link to={`${data.link}`}>
        <button className='btb btn-success'>Click</button></Link>

        <button onClick={handleChange}>navigate</button>
    </div>
  )
}

export default AddClient