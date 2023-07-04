import React from 'react'
import '../../styles/Contact.css'
import Navbar from '../Layout/partials/Navbar';function Contact() {
  const [formData,updateFormData] =React.useState('');
    
  const HandleChange =(event) =>{
      updateFormData({
        ...formData,
        [event.target.name]:event.target.value
      })
      event.preventDefault();
        }

        const HandleSubmit =(event) =>{
          console.log(formData);
          event.preventDefault();
      }
  return (
    <div className='container'>
<Navbar/>
      <div className='buttomContainer'>
      <div className='leftside'>
       
      <h1>See CareCare</h1>
      <h1>Live in <span>Action</span></h1>  </div>
      <div className='rightside'>
      <form className='form' onSubmit={HandleSubmit}>
        <h2>Get In Touch</h2>    
          <div className="mb-3 mt-3">
  <label htmlFor="name" className="form-label">
    Name:
  </label>
  <input
    type="text"
    className="form-control" 
    id="name"
    placeholder="Enter Name"
    name="name"
    onChange={HandleChange}
  />
</div>

<div className="mb-3 mt-3">
  <label htmlFor="email" className="form-label">
    Email:
  </label>
  <input
    type="email"
    className="form-control" 
    id="email"
    placeholder="Enter email"
    name="email"
    onChange={HandleChange}
  />
</div>

<div className="mb-3">
  <label htmlFor="phone" className="form-label">
    Phone Number:
  </label>
  <input
    type="number"
    className="form-control"
    id="phone"
    placeholder="Enter Phone Number"
    name="phone"
    onChange={HandleChange}
  />
</div>

<div className="mb-3">
<label for="comment">Comments:</label>
<textarea class="form-control" rows="5" id="comment" name="text"></textarea>

</div>
<button type="submit" className="btn btn-primary">
  Submit
</button>
</form>
      
      </div></div></div>
  
      
  
      
     
  )
}

export default Contact