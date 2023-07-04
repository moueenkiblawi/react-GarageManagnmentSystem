import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AddService.css';

function AddService({ type }) {
  const [service_invoice, setInvoice] = useState('');
  const [service_cost, setCost] = useState('');
  const [service_date, setDate] = useState('');
  const [otherService, setOtherService] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();



  let data;
  switch (type) {
    case 'admin':
      data = {
        title: 'ADMIN',
        link: `/cars/${id}`,
      };
      break;

    case 'user':
      data = {
        title: 'USERS',
        link: `/worker/cars/${id}`,
      };
      break;

    default:
      break;
  }

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081/Auth').then((res) => {
      if (res.data.Status === 'Success') {
      } else {
        navigate('/login');
      }
    });
  });

  useEffect(() => {
    axios
      .get('http://localhost:8081/servicecheck')
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCheckboxChange = (event) => {
    const serviceName = event.target.value;
    const isChecked = event.target.checked;

    if (serviceName === 'Others') {
      setShowOtherInput(isChecked);
      if (!isChecked) {
        setOtherService('');
      }
    } else {
      setSelectedServices((prevSelectedServices) => {
        if (isChecked) {
          return [...prevSelectedServices, serviceName];
        } else {
          return prevSelectedServices.filter((name) => name !== serviceName);
        }
      });
    }
  };

  function HandleSubmit(event) {
    event.preventDefault();
    if ( !service_cost || !service_date || selectedServices.length === 0) {
      alert('Please fill in all the required fields');
      return;
    }
  
    let updatedSelectedServices = [...selectedServices];
  
    if (showOtherInput && otherService) {
      updatedSelectedServices.push(otherService);
    }
  
    axios
      .post(`http://localhost:8081/api/cars/${id}/Addservices`, {
        service_check: updatedSelectedServices,
        service_invoice,
        service_cost,
        service_date,
      })
      .then((res) => {
        console.log(res);
        navigate(data.link);
        setSelectedServices([]);
        setOtherService('');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  useEffect(() => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <div
          className="shadow"
          style={{
            backgroundColor: 'lightgrey',
            color: 'darkblue',
            textAlign: 'center',
            height: '10vh',
          }}
        >
          <h1>Add Service </h1>
        </div>

        <div className="d-flex flex-column align-items-center pt-7 ">
          <form
            className="form-service"
            style={{ width: '60%' }}
            onSubmit={HandleSubmit}
          >
            <br />
            <label htmlFor="service_check">
              <h3> Services:</h3>
            </label>
            <div className="row1">
              {services.map((service) => (
                <div className="checkbox" key={service.id}>
                  <input
                    type="checkbox"
                    id={service.name}
                    name="service_check"
                    // required="true"
                    value={service.name}
                    checked={selectedServices.includes(service.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={service.name}>{service.name}</label>
                </div>
              ))}
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="others"
                  name="service_check"
                  value="Others"
                  checked={showOtherInput}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="others">Others</label>
                {showOtherInput && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Other Service"
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                  />
                )}
              </div>
            </div>



          <div className="col-12">
  <label htmlFor="name" className="form-label">
    Service Description:
  </label>
  <textarea
    type="text"
    className="form-control rounded-0" 
    id="name"
    placeholder="Enter Name"
    name="name"
    onChange={e =>setInvoice(e.target.value)}
  />
  </div>

  <div className="col-12" style={{marginTop:"10px"}}>
  <label htmlFor="cost" className="form-label" >
    Service Cost:
  </label>
  <input
    type="number"
    required={true}
    className="form-control" 
    id="cost"
    placeholder="Enter Cost"
    name="cost"
    onChange={e =>setCost(e.target.value)}
  />
  </div>
  <div className="col-12" style={{marginTop:"10px"}}>
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              placeholder="Enter Date"
              name="date"
              value={service_date} 
              onChange={e => setDate(e.target.value)}
            />
          </div>





  <button  type="submit" className="btn btn-primary">
  Submit
  </button>
  </form>
      
      </div></div>
      </div> )
  }

  export default AddService