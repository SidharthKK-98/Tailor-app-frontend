import React, { useState } from 'react'
import Header from '../components/Header'
import HomeBody from '../components/HomeBody'
import  CustomFooter from '../components/CustomFooter'


function Home() {

  const [insideHome,setInsideHome]=useState(true)
  return (
    <div className='bg-fixed w-full  bg-gray-900 '>
      
      <Header insideHome={insideHome}/>

      <div className=' h-1/3   '>
      <HomeBody/>

      </div>

      

      <div className='mt-10'>
        
        <CustomFooter/>
          
      </div>
    
     
     
    </div>
  )
}

export default Home
