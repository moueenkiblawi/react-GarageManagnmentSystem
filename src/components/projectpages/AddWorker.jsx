import React,{useEffect, useState} from 'react'
import axios from 'axios'
import AdminLayout from '../Layout/AdminLayout'
import { useNavigate } from 'react-router-dom'
import '../../styles/addworker.css'

function AddWorker() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [address,setAddress]=useState("")
  const [number,setNumber]=useState("")
  const [role,setRole]=useState("")
  const [image,setImage]=useState('')
  const navigate=useNavigate();


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

    
  function HandleSubmit(event){

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("image", image);
      event.preventDefault();
      axios.post("http://localhost:8081/addWorker",formData)
    .then(res =>{
      console.log(res);
     
      }).catch(err => console.log(err));
      navigate('/worker')
  } 


  return (
<AdminLayout>
    <div className='container'>
    <div className='shadow' style={{backgroundColor:"lightgrey" ,color:"darkblue" ,textAlign:"center",height:"10vh"}}><h1>Add Worker </h1></div>
    <div className='d-flex flex-column align-items-center pt-7 '>
    <form className='form-service ' onSubmit={HandleSubmit}  style={{width:"50%"}} >
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
            name="pswd"
            onChange={e =>setPassword(e.target.value)}
          />
        </div>
        <div className="col-12" style={{marginTop:"10px"}}>

        <label htmlFor="name" className="form-label">
  Address:
</label>
<input
  type="text"
  className="form-control" 
  id="name"
  placeholder="Enter Name"
  name="name"
  onChange={e =>setAddress(e.target.value)}
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
/>
</div>

<div className="col-12" style={{marginTop:"10px"}}>
  <label htmlFor="role" className="form-label">
    Role:
  </label>
  <div className="form-check">
    <input 
      className="form-check-input" 
      type="radio" 
      name="role" 
      id="user" 
      value="user" 
      onChange={e => setRole(e.target.value)}
    />
    <label className="form-check-label" htmlFor="user">
      User
    </label>
  </div>
  <div className="form-check">
    <input 
      className="form-check-input" 
      type="radio" 
      name="role" 
      id="admin" 
      value="admin" 
      onChange={e => setRole(e.target.value)}
    />
    <label className="form-check-label" htmlFor="admin">
      Admin
    </label>
  </div>
</div>


<div className="col-12" style={{marginTop:"10px"}}>
<label htmlFor="inputGroupFile01" className="form-label">
  Select Image
</label>
<input
  type="file"
  className="form-control"
  id="inputGroupFile01"
  name="image"
  onChange={e =>setImage(e.target.files[0])}
/>
</div>





<button  type="submit" className="btn btn-primary">
Submit
</button>
</form>
    
    </div></div>
    </AdminLayout>  )
}

export default AddWorker