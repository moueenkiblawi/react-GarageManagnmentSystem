import React, {  useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function AddCar({type}) {
  const [carModel, setCarModel] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [carNames, setCarNames] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8081/Auth").then((res) => {
      if (res.data.Status === "Success") {
      } else {
        navigate("/login");
      }
    });
  });


  useEffect(() => {
    axios.get('http://localhost:8081/getCarName')
    .then((response) => {
      setCarNames(response.data);
  })}, []);

  const handleCarChange = (event) => {
    setSelectedCar(event.target.value);
  };
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    
      const response = await axios.get(`http://localhost:8081/CheckCarNumber/${carNumber}`);
      const carExists = response.data.exists;
  
      if (carExists) {
        alert(`Identification code ${carNumber} is already exist`);

    } else {
      axios.post("http://localhost:8081/Addcars", {
        selectedCar,
        carModel,
        carNumber,
        clientName,
        clientEmail,
        clientNumber,
      })
       .then(res =>{
        console.log(res);
        navigate(data.link2)

        }).catch(err => console.log(err));
  };}

 
  const filteredCarNames = carNames.filter((car) =>
  car.name.toLowerCase().includes(selectedCar.toLowerCase())
);


let data;
switch(type){
  case "admin":
        data={
        title:"ADMIN",
        link:"/addCar",
        link2:'/carList'
            };
    
    break;

  case "user":
        data={
        title:"USERS",
        link:"/worker/addCar",
        link2:'/workerDashboard'
        };
    
    break;
    default:
    break;}





  return (
    <div className="home-container">

    <div className='container'>
    <div className='shadow' style={{backgroundColor:"lightgrey" ,color:"darkblue" ,textAlign:"center",height:"10vh"}}><h1>Add Car </h1></div>
    <div className='d-flex flex-column align-items-center pt-7  '>
    <form className='form-service ' onSubmit={handleSubmit}  >

        <div className="col-12">
        <label htmlFor="car-dropdown" className="form-label">Select a car:</label>
          <input
        type="text"
        placeholder='Select a Car'
        required={true}
        id="car-dropdown"
        name="car-dropdown"
        value={selectedCar}
        onChange={handleCarChange}
        className="form-control"
        list="car-options"
      />
      <datalist id="car-options">
      <option value="">--Please choose a car--</option>
        {filteredCarNames.map((car) => (
          <option key={car.id} value={car.name} />
        ))}
      </datalist>
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
  onChange={e =>setCarModel(e.target.value)}
/>
</div>
<div className="col-12" style={{marginTop:"10px"}}>
          <label htmlFor="pwd" className="form-label">
           Chassis Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="pwd"
            placeholder=" Chassis Number"
            name="pswd"
            minLength={11}
            required={true}
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
            required={true}
            placeholder="Enter Client Name"
            name="clientname"
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
            required={true}
            placeholder="Enter Client Email"
            name="clientemail"
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
            required={true}
            placeholder="Enter Client Number"
            name="clientno"
            onChange={e =>setClientNumber(e.target.value)}
          />
        </div>
<button  type="submit" style={{background:"rgb(2, 2, 102)"}} className="btn btn-primary">
Submit
</button>
</form>
    
    </div></div>

    </div>


  )
  
}

export default AddCar