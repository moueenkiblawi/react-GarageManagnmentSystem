import React from 'react';
import logo from '../../../assets/CaCareLogo.jpeg'; // import your logo image
import'../../../styles/Navbar.css'
import { NavLink,Link } from 'react-router-dom'
import { Button} from "grommet";

function Navbar() {
  return (
    <nav>
      <div className="navbar-logo">
       <Link to='/' ><img src={logo} alt="Logo" /></Link>
      </div>
      <ul className="navbar-links">
     <li> <NavLink to="/">Home</NavLink></li>
      <li> <Link to="/contact">Conatct</Link></li>
      <li><Link to="/services">Service</Link></li>
      <li>
        <Button
          style={{backgroundColor:"green",color:"white"}} 
            label="Login"
            alignSelf="center"
            href={`/login`}
          /></li>
      </ul>
    </nav>
  );
}

export default Navbar;