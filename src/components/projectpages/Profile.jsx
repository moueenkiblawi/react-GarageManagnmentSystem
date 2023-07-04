import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '.././../styles/profile.css';
import { Button } from 'grommet';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8081/Auth").then((res) => {
      if (res.data.Status === "Success") {
        setUserData(res.data.user);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedUserData = {
      name: updatedData.name || userData.name,
      email: updatedData.email || userData.email,
      password: updatedData.password || userData.password,
      number: updatedData.number || userData.number,
    };
  
    axios
      .put(`http://localhost:8081/updateWorker/${userData.id}`, updatedUserData)
      .then((res) => {
        console.log(res.data);
        setUserData((prevData) => ({
          ...prevData,
          ...updatedUserData,
        }));
        setEditMode(false); 
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  

  return (
    <div className="homeContainer">
      <div>
        {userData && userData.name && (
          <div>
            <div className="home-profile">
              <img src={'http://localhost:8081/images/' + userData.image} alt="" />
            </div>
            <div className="invoice-box">
              <table cellPadding="0" cellSpacing="0">
                <tr className="">
                  <td colSpan="2"></td>
                </tr>
                <tr className="information">
                  <td colSpan="2">
                    <table>
                      <tr>
                        <td>
                          <span className="span-profile">Customer name:</span>
                          {editMode ? (
                            <input
                            className="form-control"
                              type="text"
                              name="name"
                              value={updatedData.name || userData.name}
                              onChange={handleInputChange}
                            />
                          ) : (
                            userData.name
                          )}
                        </td>
                        <td>
                          <span className="span-profile">Phone Number:</span>{' '}
                          {editMode ? (
                            <input
                            className="form-control"
                              type="text"
                              name="number"
                              value={updatedData.number || userData.number}
                              onChange={handleInputChange}
                            />
                          ) : (
                            userData.number
                          )}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr className="heading">
                  <td>Personal Information:</td>
                </tr>
                <tr className="item">
                  <td>
                    <span className="span-profile">Email:</span>
                  </td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={updatedData.email || userData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData.email
                    )}
                  </td>
                </tr> 
                <tr className="item">
                  <td>
                    <span className="span-profile">Address:</span>
                  </td>
                  <td>
                    {editMode ? (
                      <input
                      className="form-control"
                        type="text"
                        name="address"
                        value={updatedData.address || userData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData.address
                    )}
                  </td>
                </tr>
                <tr className="item">
                  <td>
                    <span className="span-profile">Role:</span>
                  </td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        name="role"
                        className="form-control"
                        value={updatedData.role || userData.role}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData.role
                    )}
                  </td>
                </tr>
                <tr className="item">
  <td>
    <span className="span-profile">Password:</span>
  </td>
  <td>
    {editMode ? (
     
      <input
      type="password"
      className="form-control"
      id="pwd"
      placeholder="Enter password"

      name="pswd"
      value={updatedData.password || userData.password}
      onChange={handleInputChange}
    />
    ) : (
      '********' 
    )}
  </td>
</tr>

              </table>
              {editMode ? (
              <Button style={{backgroundColor:"darkblue",color:"white",marginTop:"10px"}} primary label="Save" onClick={handleUpdate} />
            ) : (
              <Button style={{backgroundColor:"darkblue" ,color:"white",marginTop:"15px"}} label="Edit" onClick={handleEdit} />
            )}
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
