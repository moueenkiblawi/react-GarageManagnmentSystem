import React from 'react'
import WorkerSidebar from './partials/WorkerSidebar'

function UserLayout(props) {
  return (
    <>
    <div className='home-sidebar'>
      <WorkerSidebar/> 
    <div className="homeContainer">
        {props.children}
    </div>
    </div>
    </>
  )
}

export default UserLayout