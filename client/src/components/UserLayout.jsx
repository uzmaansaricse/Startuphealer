// src/layouts/UserLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../components/UserSidebar'

const UserLayout = () => {
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout
