import React from 'react'
import AddCar from '../projectpages/AddCar'
import AdminLayout from '../Layout/AdminLayout'

function AdminAddCar() {
  return (
    <div>
         <AdminLayout>
    <AddCar type='admin'/>
  </AdminLayout> 
    </div>
  )
}

export default AdminAddCar