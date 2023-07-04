import React from 'react'
import AddService from '../projectpages/AddService'
import AdminLayout from '../Layout/AdminLayout'

function AdminAddService() {
  return (
    <div>
         <AdminLayout>
    <AddService type="admin" />
  </AdminLayout>
    </div>
  )
}

export default AdminAddService