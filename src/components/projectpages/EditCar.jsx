import React, { useEffect, useState } from 'react';
import axios from "axios";

import { useNavigate, useParams } from 'react-router-dom';
// import AdminLayout from '../Layout/AdminLayout';

function EditCar({type}) {
  const [car_name, setCarName] = useState("");
  const [car_model, setCarModel] = useState("");
  const [car_number, setCarNumber] = useState("");
  const [client_name, setClientName] = useState("");
  const [client_email, setClientEmail] = useState("");
  const [client_number, setClientNumber] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  let data;
  switch(type){
    case "admin":
          data={
          title:"ADMIN",
          link:`/carList`,
          

              };
      
      break;
  
    case "user":
          data={
          title:"USERS",
          link:`/workerDashboard`,
         
          };
      
      break;
      default:
      break;}

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
    axios.get(`http://localhost:8081/getOneCar/${id}`)
      .then(res => {
        const carData = res.data.Result[0];
        setCarName(carData.car_name);
        setCarModel(carData.car_model);
        setCarNumber(carData.car_number);
        setClientName(carData.client_name);
        setClientEmail(carData.client_email);
        setClientNumber(carData.client_number);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:8081/updateCar/${id}`, {
      car_name,
      car_model,
      car_number,
      client_name,
      client_email,
      client_number
    })
      .then(res => {
        if (res.data.updated) {
          navigate(data.link);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <div className='container'>
    <div className='d-flex flex-column align-items-center pt-7 '>
    <div className='shadow' style={{backgroundColor:"lightgrey" ,color:"darkblue",width:"100%" ,textAlign:"center",height:"10vh"}}><h1>Update Car</h1></div>

    <form className='form-service ' onSubmit={handleSubmit}  >

        <div className="col-12">
<label htmlFor="name" className="form-label">
   Car Name:
</label>
<input
  type="text"
  className="form-control" 
  id="name"
  placeholder="Enter Car Name"
  name="name"
  value={car_name }

  onChange={e =>setCarName(e.target.value)}
/>
</div>

<div className="col-12" style={{marginTop:"10px"}}>
<label htmlFor="model" className="form-label" >
 Car Model
</label>
<input
  type="text"
  className="form-control" 
  id="model"
  placeholder="Enter Car Model"
  name="model"
  value={car_model}

  onChange={e =>setCarModel(e.target.value)}
/>
</div>
<div className="col-12" style={{marginTop:"10px"}}>
          <label htmlFor="pwd" className="form-label">
           Car Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            value={car_number}

            onChange={e =>setCarNumber(e.target.value)}
          />
        </div>
<div className="col-12" style={{marginTop:"10px"}}>
          <label htmlFor="clientname" className="form-label">
           Client Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="clientname"
            placeholder="Enter Client Name"
            name="clientname"
            value={client_name}

            onChange={e =>setClientName(e.target.value)}
          />
        </div>
<div className="col-12" style={{marginTop:"10px"}}>
          <label htmlFor="clientemail" className="form-label">
           Client Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="clientemail"
            placeholder="Enter Client Email"
            name="clientemail"
            value={client_email}

            onChange={e =>setClientEmail(e.target.value)}
          />
        </div>
<div className="col-12" style={{marginTop:"10px"}}>
          <label htmlFor="clientno" className="form-label">
           Client Number:
          </label>
          <input  
            type="text"
            className="form-control"
            id="clientno"
            placeholder="Enter Client Number"
            name="clientno"
            value={client_number}
            onChange={e =>setClientNumber(e.target.value)}
          />
        </div>





<button style={{backgroundColor:'rgb(9, 3, 99)'}} type="submit" className="btn ">
Update</button>
</form>
    
    </div></div>
  )
  
}

export default EditCar