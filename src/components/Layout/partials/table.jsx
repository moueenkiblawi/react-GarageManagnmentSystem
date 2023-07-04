import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom'

function Table() {
  const [cars, setCars] = useState([]);


  const [currentPage] = useState(1);
  const recordPerPage = 4;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = cars.slice(firstIndex, lastIndex);

  useEffect(() => {
    axios.get("http://localhost:8081/dashTable").then((response) => {
      setCars(response.data);
    });
  }, []);
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

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:8081/deleteCar/`+id).then(() => {
  //     setCars(cars.filter((car) => car.id !== id));
  //   });
  // };


 

  return (

    <div className=''>
    
   

      <table className='table'>
            <thead >
                <tr style={{background:" rgb(9, 3, 99)" , color:"white"}} >
                <th> Car Name</th>
                <th>Chassis Number</th>
                <th>Client Name</th>
                <th>Service Date</th>
                {/* <th>Action</th> */}
                </tr>
            </thead>
            <tbody>
            {
                records.map((car)=>(
                    <tr key={car.id}>

                    <td>{car.car_name}</td>
                    <td>{car.car_number}</td>
                    <td>{car.client_name}</td>
                    <td>{car.service_date.split("T")[0]}</td>
                    {/* <td>
                        <Link  to={"/editCar/"+car.id} >
                        <button style={{color:"red"}} title='Edit'><EditIcon/></button></Link>
                        
                        <button onClick={() => handleDelete(car.id)} style={{color:"blue"}} title='Delete'><DeleteIcon/></button>
                        <Link to={`/cars/${car.id}`}>
                        <button to={`/cars/${car.id}`} style={{color:"green"}} title='View'><VisibilityIcon/></button>
                        </Link>
                        </td> */}
                        </tr>
                    ))
            }
            
            </tbody>
        </table>

             


      

    </div>
   
  )
  // function nextPage(){
  //   if(currentPage !==npage){
  //     setCurrentPage(currentPage+1);
  // }}
  // function prePage(){
  //   if(currentPage >1){
  //   setCurrentPage(currentPage-1);}
  // }
  // function changeCPage(i){
  //   setCurrentPage(i);
  // }
  
}

export default Table
