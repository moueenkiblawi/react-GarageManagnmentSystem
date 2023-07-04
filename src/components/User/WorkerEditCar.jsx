import React from 'react'
import EditCar from '../projectpages/EditCar'
import UserLayout from '../Layout/UserLayout'

function WorkerEditCar() {
  return (
    <div>
      <UserLayout>
          <EditCar type="user"/>
        </UserLayout>
    </div>
  )
}

export default WorkerEditCar
