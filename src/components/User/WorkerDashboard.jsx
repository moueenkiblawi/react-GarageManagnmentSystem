import React from 'react'
import UserLayout from '../Layout/UserLayout'
import CarList from '../projectpages/Carlist'

function WorkerDashboard() {
  return (
    <div>
       <UserLayout>
          <CarList type="user"/>
        </UserLayout>
    </div>
  )
}

export default WorkerDashboard
