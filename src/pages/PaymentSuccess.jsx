import React, { useEffect, useRef } from 'react'
import { Card } from "flowbite-react";
import {  useLocation, useNavigate } from 'react-router-dom';
import useOrder from '../hooks/useOrder';




function PaymentSuccess() {

  const postOrder=useOrder()
  const navigate=useNavigate()
  const orderPlaced = useRef(false); // Ref to track if the order has been placed


    const query=new URLSearchParams(useLocation().search)
    const reference=query.get("reference")

    
    
    const handleOrder=async()=>{

      if (orderPlaced.current) return; // Prevent multiple calls

      orderPlaced.current = true; // Mark the order as placed


      try{

        await postOrder() //posting order
        console.log("after   await postOrder() ");
        
        
      }
      catch(err){
        console.log(err);
        
      }

    }

    useEffect(() => {
      
      handleOrder()

      const timer=setTimeout(() => {

        navigate('/customerPage')      
      }, 5000);
      return ()=>clearTimeout(timer)
    
    }, [navigate])
    
  return (
    <div className='flex justify-center h-lvh items-center'>

        <Card href="#" className="max-w-sm bg-white">
            <h5 className=" text-center text-2xl font-bold tracking-tight text-green-400 dark:text-white">
             Your transaction was successfull,And oreder placed<br /> thank you
            </h5>
           
            {reference&&(
                <p className='flex justify-center'>
                    <strong>reference ID:</strong>{reference}
                </p>
            )

            }
            </Card>
      
    </div>
  )
}

export default PaymentSuccess
