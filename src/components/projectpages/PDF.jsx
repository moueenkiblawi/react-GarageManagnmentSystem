import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactToPdf from 'react-to-pdf';
import '../../styles/pdf.css';
import { Button } from 'grommet';
import QRCode from "qrcode.react";


function PDF() {
  const ref = React.createRef();
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [services, setServices] = useState([]);
  const today = new Date();

  useEffect(() => {
    axios.get(`http://localhost:8081/api/cars/${id}`).then((response) => {
      setCar(response.data);
    });
    axios.get(`http://localhost:8081/api/cars/${id}/services`).then((response) => {
      setServices(response.data);
    });
  }, [id]);

  
  const totalServiceCost = services.reduce((total, service) => total + service.service_cost, 0);

  const servicedata =
  services.map(
    (service) =>
      `Date: ${service.service_date.split("T")[0]} Services: ${
        service.service_check
      }\n`
  );
  
  return (
    <div>
      <div ref={ref} className="invoice-box">
      

        <table cellPadding="0" cellSpacing="0">
          <tr className="">
            <td colSpan="2">
              <table>
                <tr>
                  <td>  Date: {`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</td>
                </tr>
              </table>
            </td>
          </tr>
          {car.length > 0 && (
            <tr className="information">
              <td colSpan="2">
                <table>
                  <tr>
                    <td>Customer name:  {car[0].client_name}</td>
                    <td>Car name :  {car[0].car_name}</td>
                    
                  </tr>
                </table>
              </td>
            </tr>
          )}
          <tr className="heading">
            <td>Services:</td>
            <td>Date:</td>
            <td>Price:</td>
          </tr>
          
          {services.length > 0 ? (
  services.map((service) => (
    <tr className="item" key={service.id}>
      <td>{service.service_check}</td>
      <td style={{ margin: "5" }}>{service.service_date.split("T")[0]}</td>
      <td>{service.service_cost}$</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="3" style={{ textAlign: "center" }}>
      No Service Yet
    </td>
  </tr>
)}

         
          <tr>
          {car.length > 0 && services.length > 0 && (
          <h3 className="justify-center">   Total price: ${totalServiceCost}$</h3>
        )}
          </tr>
        </table>
       
         <br/>
                    <p>QRCODE:</p>     
                     <QRCode value={servicedata} size={200}  />

      </div>
      <div style={{ marginTop:"25px",justifyContent:"center",display:"flex"}}
>
        <ReactToPdf targetRef={ref}>
            {({ toPdf }) => 
            
             <Button
             style={{ backgroundColor: "rgb(9, 3, 99)", color: "white" ,justifyContent:"center",display:"flex"}}
             label="Download"
             alignSelf="center"
             margin={{ bottom: "20px" }}
             onClick={toPdf}
   
           />
           
            }

        </ReactToPdf></div>
    </div>
  );
}

export default PDF;
