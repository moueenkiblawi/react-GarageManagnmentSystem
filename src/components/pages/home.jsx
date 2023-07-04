import React from 'react'

//import Header from '../components/header'
import { Link } from 'react-router-dom' 
//import Image1 from '../assets/garageHome.jpeg'
import buttom from '../../assets/garagehome.png' 
import Navbar from '../Layout/partials/Navbar';
import Footer from '../Layout/partials/footer'; 
import '../../styles/Home.css'
function home() {
  return (
     <div className='container'>

      {/* <Header/> */}
<Navbar/>

    <div className='home'>
    <div className='headerContainer'>
      
      <h1>The Community-driven,cloud-based</h1>
      <p>Garage Managnment System</p>
      <Link to='/login'>
      <button>Get Started</button></Link>
    </div>
    </div>
    <div className='buttom'>
    <img src={buttom} alt='no img'/>
    </div>
    <Footer/>
    </div>
    
  )
}

export default home