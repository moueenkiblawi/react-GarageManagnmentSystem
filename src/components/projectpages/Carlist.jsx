import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

function CarList({ type }) {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8081/Auth").then((res) => {
      if (res.data.Status === "Success") {
      } else {
        navigate("/login");
      }
    });
  });

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 7;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  useEffect(() => {
    axios.get("http://localhost:8081/api/cars")
      .then((response) => {
        setCars(response.data.reverse());
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/cars`)
      .then((res) => {
        const filteredCars = res.data.filter(car => {
          return (
            car.car_name.toLowerCase().includes(search.toLowerCase()) ||
            car.car_model.toLowerCase().includes(search.toLowerCase()) ||
            car.car_number.toLowerCase().includes(search.toLowerCase()) ||
            car.client_name.toLowerCase().includes(search.toLowerCase()) ||
            car.client_email.toLowerCase().includes(search.toLowerCase()) ||
            car.client_number.toLowerCase().includes(search.toLowerCase())
          );
        });
        setCars(filteredCars.reverse());
      });
  }, [search]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deleteCar/` + id).then(() => {
      setCars(cars.filter((car) => car.id !== id));
    });
  };

  let data;
  switch (type) {
    case "admin":
      data = {
        title: "ADMIN",
        link: `/AddCar`,
        linkEdit: '/editCar',
        linkView: '/cars'
      };
      break;

    case "user":
      data = {
        title: "USERS",
        link: `/worker/AddCar`,
        linkEdit: '/worker/editCar',
        linkView: '/worker/cars'
      };
      break;

    default:
      break;
  }

  const records = cars.slice(firstIndex, lastIndex);
  const npage = Math.ceil(cars.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(i) {
    setCurrentPage(i);
  }

  return (
    <div className='container'>
      <div className="shadow" style={{ background: "lightgrey" }}>
        <h1 style={{ textAlign: "center" }}>Car List</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`${data.link}`} className='btn btn-success' style={{ marginTop: "70px", width: '200px', marginBottom: "20px" }}>Add +</Link>
        <div>
          <SearchIcon />
          <input
            style={{ marginTop: "70px", width: '200px', height: "40px", marginBottom: "15px", borderRadius: "5rem" }}
            type="text"
            placeholder={"Search cars"}
            value={search}
            onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>

      <table className='table'>
        <thead>
          <tr style={{ background: "rgb(9, 3, 99)", color: "white" }} >
            <th> Car Name</th>
            <th>Model</th>
            <th>Number</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((car) => (
            <tr key={car.id}>
              <td>{car.car_name}</td>
              <td>{car.car_model}</td>
              <td>{car.car_number}</td>
              <td>{car.client_name}</td>
              <td>{car.client_email}</td>
              <td>{car.client_number}</td>
              <td>
                <Link className="link" to={`${data.linkEdit}/${car.id}`}>
                  <EditIcon style={{ color: "red" }} />
                </Link>
                <DeleteIcon onClick={() => handleDelete(car.id)} style={{ color: "blue", cursor: "pointer" }} />
                <Link to={`${data.linkView}/${car.id}`}>
                  <VisibilityIcon style={{ color: "green" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination">
          <li className='page-item'>
            <a href="#d" onClick={prePage} className='page-link'>Prev</a>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href="#d" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
            </li>
          ))}
          <li className='page-item'>
            <a href="#d" className='page-link' onClick={nextPage}>Next</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CarList;
