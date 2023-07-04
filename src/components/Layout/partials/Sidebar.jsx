    import React from "react";
    import "../../../styles/Sidebar.css";
    import CarRepairIcon from "@mui/icons-material/CarRepair";
    import AccountCircleIcon from "@mui/icons-material/AccountCircle";
    import EngineeringIcon from "@mui/icons-material/Engineering";
    import DashboardIcon from "@mui/icons-material/Dashboard";
    import LogoutIcon from "@mui/icons-material/Logout";
    import { Link, Outlet, useNavigate } from "react-router-dom";
    import axios from "axios";

    function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get("http://localhost:8081/logout").then((res) => {
        navigate("/login");
        });
    };

    return (
        <div className="sidebar">
            
        <div className="top">
            <span className="logo">CarCare</span>
        </div>
        <hr />

        <div className="center">
            <ul>
            <p className="center-title">MAIN</p>
            <Link to="/dashboard">
                {" "}
                <li>
                <DashboardIcon className="sidebar-icons" />
                <span>Dashboard</span>
                </li>
            </Link>
            <p className="center-title">LISTS</p>
            <Link to="/worker">
                <li>
                <EngineeringIcon className="sidebar-icons" />
                <span>Workers</span>
                </li>
            </Link>

            <Link to="/carlist">
                <li>
                <CarRepairIcon className="sidebar-icons" />
                <span>Car Repair</span>
                </li>
            </Link>

            <p className="center-title">USER</p>

          

            <Link to="/adminProfile">
                <li style={{textDecoration:"none"}}>
                <AccountCircleIcon className="sidebar-icons" />
                <span >Profile</span>
                </li>
            </Link>

            <li onClick={handleLogout}>
                <LogoutIcon className="sidebar-icons" />
                <span>Logout</span>
            </li>
            </ul>
        <Outlet/>
        </div>
        </div>
    );
    }

    export default Sidebar;
