import React, { useEffect, useState } from 'react'
import commonAPI from '../services/commonAPI'
import { Card } from "flowbite-react";
import { BASE_URL } from '../services/constant';


function Orders() {

          const [allOrderDetails,setAllOrderDetails]=useState([])
          const SERVER_URL= 'http://localhost:5000'

  useEffect(() => {
  
            getAllOrderdetails()
  
        }, [])

        const getAllOrderdetails=async()=>{

          try{
  
            const url=BASE_URL+'/order/getAllOrderItems'
            const allOrderDetails=await commonAPI("GET",url,"","")
            console.log(allOrderDetails);
            setAllOrderDetails(allOrderDetails.data)
            
  
  
  
          }
          catch(err){
            console.log(err);
            
          }
        }

        const handleOrderStatusToggle=async(orderId,isFinished)=>{

          try{

            const url=SERVER_URL+'/order/updateOrderStatus'

            const res= await commonAPI("PUT",`${url}/${orderId}`,{finished:isFinished})

            if(res.status==200){
              setAllOrderDetails((prevOrderDetails)=>prevOrderDetails.map(
                    (
                        order=>order._id==orderId ? {...order,finished:isFinished}:order
                    
                    )
                ))
            }

        }
        catch(err){
            console.log(err);
            
        }

        }



  return (
     <div >

      <h2 className='text-bold text-center m-3 text-3xl text-white font-semibold'>Your Orders</h2>
    

    <div className='flex justify-center h-lvh '>

    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6 m-5">
                        {
                          allOrderDetails?.length>0?(
                            allOrderDetails.map((items,index)=>(
              
                               <Card
                                  className="max-w-sm bg-white p-4  overflow-y-auto h-[300px]"
                                  key={items._id}
                                >
              
                                    <img
                                      src={`${SERVER_URL}/uploads/${items.addedItemId.itemImg}`}
                                      alt="fashion item"
                                      className="w-full h-[220px] object-cover mt-72 rounded-md shadow-lg" // Adjust width and height here
                                    />

                                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                   Name of customer :  {items.userId.fullname}
                                  </h5>
                                  
                                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {items.addedItemId.Type}
                                  </h5>
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Fabric :{items.addedItemId.Fabric}
                                  </p>
    
                                <div className='grid grid-cols-2'>
    
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                   chest: {items.measurements.chest  + "cm"} 
                                  </p>
    
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                    waist:{items.measurements.waist  + "cm"} 
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                   length: {items.measurements.length + "cm"} 
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                   sleeve: {items.measurements.sleeve +"cm"}  
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                    inseam:{items.measurements.inseam  + "cm"}
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                   shoulder: {items.measurements.shoulder  + "cm"}
                                  </p>
    
                                </div>
                                 
                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Price : RS {items.addedItemId.Price}
                                  </p>

                                  <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Delivery Date : {items.deliveryDate}
                                  </p>

                                  <div className="form-control">

                                  <label className="cursor-pointer label">
                                    <span className="label-text">Ready to Delivery</span>
                                    <input type="checkbox"  className="checkbox checkbox-success" 
                                      checked={items.finished}
                                      onChange={e=>handleOrderStatusToggle(items._id,e.target.checked)}


                                    />
                                  </label>
                                </div>
              
                                </Card>
              
                            ))
                          )
                          :
                          (
                            <p></p>
                          )
                        }
              
                          
              
                          </div>
    

    </div>
             
          
        </div>
  )
}

export default Orders
