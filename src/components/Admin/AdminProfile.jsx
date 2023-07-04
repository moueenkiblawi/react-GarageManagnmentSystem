import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import Profile from '../projectpages/Profile'
function AdminProfile() {
   
    
      return (
        <div>
             <AdminLayout>
        <Profile type="admin" />
      </AdminLayout>
        </div>
      )
    }
    

export default AdminProfile