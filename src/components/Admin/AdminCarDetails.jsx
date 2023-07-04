import React from 'react'
import CarDetails from '../projectpages/CarDetail'
import AdminLayout from '../Layout/AdminLayout'

function AdminCarDetails() {
  return (
    <div>
          <AdminLayout>
    <CarDetails type='admin'/>
  </AdminLayout> 
    </div>
  )
}

export default AdminCarDetails