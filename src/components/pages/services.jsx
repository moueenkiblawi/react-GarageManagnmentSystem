import React from 'react'
//import Header from '../components/header'
import services1 from '../../assets/services1.png'
import services2 from '../../assets/service2.png'
import Footer from '../Layout/partials/footer';
import Navbar from '../Layout/partials/Navbar';

import '../../styles/Services.css'
function services() {
  return (
<div className='container'>
    <div className='home'> 
    <Navbar/>
    <div className='first'>
      <img src={services1} alt=''/>
    </div>
    <p>App for services can help businesses to catch the mind and share the hearts of the customers to build brand loyalty. At OkMechanic we provide custom web/mobile app development to unlock the power of better connection with customers and improves business scalability.</p>
    <div className='first'>
      <img src={services2} alt=''/>
    </div>
    <p>Social media is an essential piece of every business marketing strategy. Social platforms help you connect with your customers, increase awareness about your brand, and boost your leads and sales. OkMechanic team helps you Promote your products and services.</p>
<Footer/>
    </div></div>
    )
}

export default services