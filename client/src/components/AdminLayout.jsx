// src/layouts/AdminLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-gray-50'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
