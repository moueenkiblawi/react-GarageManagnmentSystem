  import React,{useState} from "react";
  //import Header from "../components/header";
  import '../../styles/login.css'
  // import Dashboard from '../Admin/dashboard'
   import {  useNavigate } from "react-router-dom";
  // import Navbar from "../components/Navbar";
  import axios from "axios";
import { Checkbox } from "@mui/material";
import { Button} from "grommet";

  function Login() {
   
      const [values,setValue] =useState({
        email:'',
        password:''
      });
      const [error, setError] = useState("");
      const navigate=useNavigate()
      axios.defaults.withCredentials=true;

      const HandleSubmit =(event) =>{
          event.preventDefault();
          axios.post('http://localhost:8081/login',values)
          .then(res=>{
              if(res.data.Status==='Success'){
                if(res.data.role==='admin'){
                  navigate('/dashboard')
              }
              if(res.data.role==='user'){
                navigate('/workerDashboard')

              }
            
            }
              else{
                  setError(res.data.Status);
              }
          })
          .catch(err=>console.log(err))
    }
      
      return (
        <div className="home-login">
      
     <div className="headingContainer"  >
      {/* <Header /> */}
      {/* <Navbar/>  */}
      <div className="login">
        <form className="form-login" onSubmit={HandleSubmit} >
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2 >LogIn</h2>
          
          <Button
          style={{backgroundColor:"transparent",color:"white"}} 
            label="Home"
            alignSelf="center"
            href={`/home`}
          />
          </div>
            <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control" 
              id="email"
              placeholder="Enter email"
              name="email"
              required={true}
              onChange={e=>setValue({...values,email:e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Password:
            </label>
            <input
              type="password"
              required={true}

              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              onChange={e=>setValue({...values,password:e.target.value})}
            />
          </div>
            <div style={{color:"red"}}>
          {error && error}
            </div>
          <Checkbox required={true}/>
          <a href="#k">You are agree to our terms and policies</a>

          <div className='text-danger'>
          {/* {error && error} */}
          </div>


          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
        
    </div></div></div>
    );
  }

  export default Login;
