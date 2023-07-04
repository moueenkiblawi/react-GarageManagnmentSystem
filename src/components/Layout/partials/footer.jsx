import React from 'react'
//import InstagramIcon from '@mui/icons-material/Instagram'
import { Link } from 'react-router-dom'
import '../../../styles/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
//import TwitterIcon from '@mui/icons-material/Twitter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PlaceIcon from '@mui/icons-material/Place';
import LoginIcon from '@mui/icons-material/Login';
import MailIcon from '@mui/icons-material/Mail';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

function footer() {
  return (
    <div className="footer">
    <div className="container">
      <div className="box">
        <h3>CarCare</h3>
        <ul className="social">
          <li>
            <Link to="wwww.facebook.com" className="facebook">
              <i className="fab fa-facebook-f"><FacebookIcon/></i>
            </Link>
          </li>
          <li>
            <a href="carcare@hotmail.com" className="Mail">
              <i className="fab fa-Mail"><MailIcon/></i>
            </a>
          </li>
          <li>
            <a href="www.youtube.com" className="youtube">
              <i className="fab fa-youtube"><InstagramIcon/></i>
            </a>
          </li>
        </ul>
        <p className="text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus nulla rem, dignissimos iste aspernatur
        </p>
      </div>
      <div className="box">
        <ul className="links">
          <li><Link to="/contact"><ContactMailIcon/> Contact</Link></li>
          <li><Link to="/services"><MiscellaneousServicesIcon/>Services</Link></li>
          <li><Link to="/login"><LoginIcon/> Login</Link></li>
        
        </ul>
      </div>



      <div className="box">
        <div className="line">
          <i className="fas fa-map-marker-alt fa-fw"><PlaceIcon/></i>
          <div className="info">Lebanon, Saida, Inside The Sphinx, Room Number 220</div>
        </div>
        <div className="line">
          <i className="far fa-clock fa-fw"><QueryBuilderIcon/></i>
          <div className="info">Business Hours: From 10:00 To 18:00</div>
        </div>
        <div className="line">
          <i className="fas fa-phone-volume fa-fw"><LocalPhoneIcon/></i>
          <div className="info">
            <span>+96171651667</span>
            <span>+96176992723</span>
          </div>
        </div>
      </div>
     
      
    </div>
    <p className="copyright">&copy;CareCare&lt;3 2023 </p>
  </div>
  )
}

export default footer