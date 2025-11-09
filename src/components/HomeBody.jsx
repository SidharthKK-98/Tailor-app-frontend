import React from 'react'
import { Carousel } from "flowbite-react";
import img1 from '../assets/cloth1.jpg'
import img2 from '../assets/cloth2.jpg'
import img3 from '../assets/cloth3.jpg'
import img4 from '../assets/cloth4.jpg'
import img5 from '../assets/cloth5.jpg'




function HomeBody() {
  return (

    <div>

        <div className='flex w-full  justify-center  items-end opacity-50 '>
          
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full  mt-10 sm:w-3/4">
          <Carousel>
            <div className='w-auto h-auto object-cover'>
            <img  src={img1} alt="..." />

            </div>

            <div className='w-auto h-auto object-cover'>

            <img src={img2} alt="..." />


            </div>

            <div className='w-auto h-auto object-cover'>

            <img src={img3} alt="..." />


            </div>

            <div className='w-auto h-3/4 object-cover'>

            <img src={img4} alt="..." />


            </div>

            <div className='w-auto h-auto object-cover'>

            <img src={img5} alt="..." />


            </div>
          </Carousel>
        </div>


        </div>

    </div>
    
  )
}

export default HomeBody
