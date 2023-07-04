import React from 'react'
import Profile from '../projectpages/Profile'
import UserLayout from '../Layout/UserLayout'

function workerProfile() {
  return (
    <div>
    <UserLayout>
      <Profile type="user"/>
    </UserLayout>
    </div>
  )
}

export default workerProfile