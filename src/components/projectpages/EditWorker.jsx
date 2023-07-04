import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Layout/partials/Sidebar'
import '../../styles/addworker.css'

function EditWorker() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [number,setNumber]=useState("")
  const navigate=useNavigate();

  const {id}=useParams();

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




  useEffect(() => {
    axios.get(`http://localhost:8081/getOneWorker/${id}`)
      .then(res => {
        const carData = res.data.Result[0];
        setName(carData.name);
        setEmail(carData.email);
        setPassword(carData.password);
        setNumber(carData.number);
    
        console.log(carData);
      })
      .catch(err => console.log(err));
  }, [id]);


  function HandleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/updateWorker/${id}`, {
      name,
      email,
      password,
      number,
     
    })
      .then(res => {
        if (res.data.updated) {
          navigate('/worker');
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }



  return (
    <div className='home-sidebar'>
    <Sidebar/> 
<div className="homeContainer ">
    <div className='container'>
    <div className='shadow' style={{backgroundColor:"lightgrey" ,color:"darkblue",width:"100%" ,textAlign:"center",height:"10vh"}}><h1>Update Worker</h1></div>
    <div className='d-flex flex-column align-items-center pt-7 '>

    <form className='form-service ' onSubmit={HandleSubmit}  >
    
        <div className="col-12">
<label htmlFor="name" className="form-label">
  Name:
</label>
<input
  type="text"
  className="form-control" 
  id="name"
  placeholder="Enter Name"
  name="name"
  onChange={e =>setName(e.target.value)}
  value={name}
/>
</div>

<div className="col-12" style={{marginTop:"10px"}}>
<label htmlFor="email" className="form-label" >
  Email:
</label>
<input
  type="email"
  className="form-control" 
  id="email"
  placeholder="Enter email"
  name="email"
  onChange={e =>setEmail(e.target.value)}
  value={email}
/>
</div>
<div className="col-12" style={{marginTop:"10px"}}>
<label htmlFor="pwd" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="password"
            onChange={e =>setPassword(e.target.value)}
            value={password}
          />
        </div>

<div className="col-12" style={{marginTop:"10px"}}>
<label htmlFor="phone" className="form-label">
  Phone Number:
</label>
<input
  type="text"
  className="form-control"
  id="phone"
  placeholder="Enter Phone Number"
  name="phone"
  onChange={e =>setNumber(e.target.value)}
  value={number}
/>
</div>






<button style={{backgroundColor:'rgb(9, 3, 99)'}} type="submit" className="btn ">
Update</button>
</form>
    
    </div></div>
</div></div>  )
}

export default EditWorker