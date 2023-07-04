import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import CarList from '../projectpages/Carlist'

function AdminCarList() {
  return (
    <div>
    <AdminLayout>
    <CarList  type="admin"/>
  </AdminLayout>
  </div>
  )
}

export default AdminCarList