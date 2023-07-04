
import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Text } from "grommet";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
//import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import axios from "axios";


function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/cars/${id}`).then((response) => {
      setCar(response.data);
    });
    axios
      .get(`http://localhost:8081/api/cars/${id}/services`)
      .then((response) => {
        setServices(response.data);
      });
  }, [id]);

  const servicedata =
  services.map(
    (service) =>
      `Date: ${service.service_date.split("T")[0]} Services: ${
        service.service_check
      }\n`
  );

  // const downloadServicesFile = async () => {
  //   const pdfDoc = await PDFDocument.create();
  //   const page = pdfDoc.addPage();
  //   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //   page.setFont(font);
  //   page.setFontSize(12);

  //   let yOffset = page.getHeight() - 50;

  //   for (const serviceText of servicedata) {
  //     page.drawText(serviceText, { x: 50, y: yOffset, color: rgb(0, 0, 0) });
  //     yOffset -= 20;
  //   }

  //   const pdfBytes = await pdfDoc.save();

  //   const blob = new Blob([pdfBytes], { type: "application/pdf" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "services.pdf";
  //   link.click();
  // };



  return (
    <Box align="center" pad="medium">
      {car.map((car) => (
        <Box
          key={car.id}
          width="large"
          pad="medium"
          round="small"
          background="lightgrey"
        >
          <Heading level={1} textAlign="center">
            {car.car_name}
          </Heading>
          <Box align="center">
           <QRCode value={servicedata} size={200}  />
          </Box>
          <Heading level={2} textAlign="center">
            Client Name: {car.client_name}
          </Heading>
          <Heading level={2} textAlign="center">
            Chassis number: {car.car_number}
          </Heading>
          <div style={{display:"flex",justifyContent:"space-evenly",marginTop:"10px"}}>
          <Button
          style={{backgroundColor:"rgb(9, 3, 99)",color:"white"}} 
            label="Add Service"
            alignSelf="center"
            margin={{ bottom: "20px" }}
            href={`/car/${car.id}/addservice`}
          />
          {/* <Button
             style={{backgroundColor:"rgb(9, 3, 99)",color:"white"}} 
            label="Download File"
            alignSelf="center"
            margin={{ bottom: "20px" }}
            onClick={downloadServicesFile}
          /> */}
        <Button
          style={{ backgroundColor: "rgb(9, 3, 99)", color: "white" }}
          label="Car Report"
          alignSelf="center"
          margin={{ bottom: "20px" }}
          href={`/pdf/${car.id}`}
          target="_blank"

        />
         </div>
        </Box>
      ))}
      <Box width="large" margin={{ top: "100px" }}>
        <Box
        className="shadow"
          pad="medium"
          round="small"
          background="lightgrey"
          align="center"
        >
          <Heading className="shadow"    level={1}>Services</Heading>
        </Box>
        {services.length === 0 ? (
          <Text size="large" color="red">
            No Service Yet
          </Text>
        ) : (
          services.map((service) => (
            <Box 
            className="shadow"
              key={service.id}
              margin={{ vertical: "medium" }}
              pad="medium"
              round="small"
              background="lightgrey"
            >
              <Box className="shadow">
              <Text>
                <strong>Date: </strong>
               <Text style={{color:"black",marginLeft:"15px"}}>   {service.service_date.split("T")[0]}</Text>
              </Text>
              <Text  >
                <strong>Cost: </strong>
                <Text style={{color:"black",marginLeft:"15px"}}> {service.service_cost}$</Text>
              </Text>
              <Text>
                <strong>Check: </strong>
                <Text style={{color:"black",marginLeft:"15px"}}>  {service.service_check}</Text>
              </Text>
              <Text>
                <strong>Description: </strong>
               <Text style={{color:"black",marginLeft:"15px"  }}> {service.service_invoice}</Text>
              </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default CarDetails;









