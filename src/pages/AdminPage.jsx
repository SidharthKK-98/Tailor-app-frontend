import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function AdminPage() {

  const [insideAdminPage,setInsideAdminPage]=useState(true)
  return (
    <div>
      <Header insideAdminPage={insideAdminPage}/>
      
      <div className='flex flex-col sm:flex-row justify-center items-center h-lvh gap-2'>
      <Link to={'/fashionAndFabric'} className='btn bg-red-100 text-black hover:text-white shadow-xl'>Manage Fashion and Fabrics</Link>
      <Link to={'/manageCustemers'} className='btn  bg-red-100 text-black  hover:text-white shadow-xl'>Manage Customers</Link>

      <Link to={'/order'} className='btn  bg-red-100 text-black  hover:text-white shadow-xl'>Orders</Link>


      </div>
    </div>
  )
}

export default AdminPage
