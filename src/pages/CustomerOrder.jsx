import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import commonAPI from '../services/commonAPI';
import { useAuthContext } from '../context/AuthContext'
import { BASE_URL } from '../services/constant';


function CustomerOrder() {



        const {authUser}=useAuthContext()
        console.log(authUser.data._id);
        const [orderDetails,setOrderDetails]=useState([])
        const SERVER_URL=BASE_URL

      
      useEffect(() => {

        if(authUser?.data?._id){
          getOrderdetails(authUser?.data._id)

        }
        
      
      }, [authUser])
      


      const getOrderdetails=async(userId)=>{

        try{

          const url=BASE_URL+'/order/getOrderItems'
          const orderDetails=await commonAPI("POST",url,{userId},"")
          console.log(orderDetails);
          setOrderDetails(orderDetails.data)
          



        }
        catch(err){
          console.log(err);
          
        }
      }
      
      
    
  return (
    <div >

      <h2 className='text-white text-3xl font-semibold text-center m-4'>
        PLACED ORDERS
      </h2>

      <div className='flex justify-center h-lvh items-center'>

      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 m-5">
                    {
                      orderDetails?.length>0?(
                        orderDetails.map((items,index)=>(
          
                           <Card
                              className="max-w-sm bg-white p-4  overflow-y-auto h-[300px]"
                              key={items._id}
                            >
          
                                <img
                                  src={`${SERVER_URL}/uploads/${items.addedItemId.itemImg}`}
                                  alt="fashion item"
                                  className="w-full h-[220px] object-cover mt-52 rounded-md shadow-lg" // Adjust width and height here
                                />
                              
                              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {items.addedItemId.Type}
                              </h5>
                              <p className="font-semibold text-gray-700 dark:text-gray-400">
                                Fabric : {items.addedItemId.Fabric}
                              </p>

                            <div className='grid grid-cols-2'>

                            <p className="font-normal text-gray-700 dark:text-gray-400">
                               chest: {items.measurements.chest}
                              </p>

                              <p className="font-normal text-gray-700 dark:text-gray-400">
                                waist:{items.measurements.waist}
                              </p>
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                               length: {items.measurements.length}
                              </p>
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                               sleeve: {items.measurements.sleeve}
                              </p>
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                                inseam:{items.measurements.inseam}
                              </p>
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                               shoulder: {items.measurements.shoulder}
                              </p>

                            </div>
                             
                              <p className="font-semibold text-gray-700 dark:text-gray-400">
                                Price : RS {items.addedItemId.Price}
                              </p>

                              {
                                items.finished&&
                                <p className="font-semibold text-green-500 dark:text-gray-400">
                                    Ready to Delivery
                                </p>

                              }

                             


          
                            </Card>
          
                        ))
                      )
                      :
                      (
                        
                            <h2 className='text-3xl text-black text-center ms-[-460px]' >No Orders Placed</h2>

                        
                      )
                    }
          
                      
          
                      </div>

      </div>

        

      
    </div>
  )
}

export default CustomerOrder
