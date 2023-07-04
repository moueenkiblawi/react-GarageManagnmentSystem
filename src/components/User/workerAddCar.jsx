import React from 'react'
import AddCar from '../projectpages/AddCar'
import UserLayout from '../Layout/UserLayout'
function workerAddCar() {
  
  return (
    <div>
    <UserLayout>
      <AddCar type="user"/>
    </UserLayout>
    </div>
  )
}

export default workerAddCar


