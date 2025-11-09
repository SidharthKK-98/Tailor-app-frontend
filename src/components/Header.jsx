import React from 'react'
import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

function Header({insideHome,insideAdminPage,insideCustomerPage}) {

  const navigate=useNavigate()
  const {logout}=useLogout()

  const handleLogin=()=>{
    navigate('/login')
  }

  const handleLogout=async(e)=>{
    e.preventDefault()
    await logout()
  }

  const handleOrder=()=>{
    navigate('/customerOrder')
  }


  return (
    <div className='relative' >
        
     <Navbar fluid rounded  className=' bg-transparent shadow-2xl rounded-sm   w-full'>
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <i className="fa-solid fa-shirt mx-2 text-gray-400 text-2xl"></i>
        <span className="self-center whitespace-nowrap text-xl font-bold  dark:text-gray-900 text-gray-400 " >Tailor's App</span>
      </Navbar.Brand>
      {
        insideHome&&(
          <>

          <div className="flex md:order-2">
          <Button className='bg-amber-800 hover:bg-amber-900 px-4' onClick={handleLogin} >Login</Button>
          {/* <Navbar.Toggle /> */}
        </div>
        

          </>
          

        )
      }

      <div className='flex flex-cols gap-2'>

{



(insideAdminPage || insideCustomerPage)&&(
  <>
    <div className='flex flex-cols gap-2'>
    <Button className='bg-amber-800 hover:bg-amber-900 px-4' onClick={handleLogout} >Logout</Button>
    </div>
   

  </>
)

}


{

( insideCustomerPage)&&(
  <Button className='bg-amber-800 hover:bg-amber-900 px-4' onClick={handleOrder} >Orders</Button>

)

}



      </div>

      
     
    </Navbar>

    </div>
  )
}

export default Header
