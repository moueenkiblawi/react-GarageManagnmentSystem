import React from 'react'
import UserLayout from '../Layout/UserLayout'
import CarDetails from '../projectpages/CarDetail'

function WorkerCarDetails() {
  return (
    <div>
        <UserLayout>
          <CarDetails type="user"/>
        </UserLayout>
    </div>
  )
}

export default WorkerCarDetails