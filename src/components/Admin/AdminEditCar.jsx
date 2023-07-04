import React from 'react'
import EditCar from '../projectpages/EditCar'
import AdminLayout from '../Layout/AdminLayout'

function AdminEditCar() {
  return (
    <div>
         <AdminLayout>
    <EditCar type='admin'/>
  </AdminLayout>
    </div>
  )
}

export default AdminEditCar