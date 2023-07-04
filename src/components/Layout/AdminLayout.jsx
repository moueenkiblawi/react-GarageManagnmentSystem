import React from 'react'
import Sidebar from './partials/Sidebar'
function AdminLayout(props) {
  return (
  <>
   <div className='home-sidebar'>
      <Sidebar/> 
    <div className="homeContainer">
        {props.children}
    </div>
    </div>
  </>
   
  )
}

export default AdminLayout