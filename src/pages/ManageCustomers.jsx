import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from "../context/AuthContext";
import commonAPI from '../services/commonAPI';
import { Card } from "flowbite-react";
import { BASE_URL } from '../services/constant';



function ManageCustomers() {

    const getcustomer=useRef(false)
    const {authUser}=useAuthContext()
    const id= authUser.data._id
    const [customers,setCustomers]=useState([])

    const getCustomers=async(id)=>{

        try{

            if(getcustomer.current) return
            getcustomer.current=true
            const url=BASE_URL+'/getUsers/getAllCustomers'
            const res= await commonAPI("GET",`${url}/${id}`)
            console.log(res);
            setCustomers(res.data)
            

        }
        catch(err){
           console.log(err);
                
        }

    }

    useEffect(() => {
     
        getCustomers(id) 

    }, [customers])

    const handleDelete=(customerId)=>{

        const isConfirmed=window.confirm("Are you sure do you want to delete")
  
        if(!isConfirmed){
          return
        }
  
        deleteUser(customerId)
  
      }

    const deleteUser=async(customerId)=>{

        console.log(customerId);
        

        try{
            const url=`http://localhost:5000/api/getUsers/deleteCustomer/${customerId}`
            const res= await commonAPI("DELETE",url)
            console.log(res);
            if(res.status==201){
            alert(res.data)
            }
            if(res.status==200){
                setCustomers(customers.filter(customer => customer._id !== customerId))
                alert(res.data.message)
            }

        }
        catch(err){
            console.log(err);
            
        }

    }

    const handleBlockToggle=async(customerId,isBlocked)=>{

        try{

            const url=BASE_URL+'/getUsers/updateUserStatus'

            const res= await commonAPI("PUT",`${url}/${customerId}`,{block:isBlocked})

            if(res.status==200){
                setCustomers((prevCustomer)=>prevCustomer.map(
                    (
                        customer=>customer._id==customerId ? {...customer,block:isBlocked}:customer
                    
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

        <div className='flex justify-center  items-center mt-28 p-6 '>

             <div className='grid sm:grid-cols-3 gap-4'>

                {
                   customers?.length >0?(
                    customers.map(customer=>(

                        <Card href="#" className="max-w-sm bg-gray-50">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Full Name : {customer.fullname}
                        </h5>

                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            User Name : {customer.username}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Id : {customer._id}
                        </p>


                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Block</span>
                                <input type="checkbox" className="checkbox checkbox-error"
                                    checked={customer.block}
                                    onChange={e=>handleBlockToggle(customer._id,e.target.checked)}
                                />
                            </label>
                            </div>

                            <button onClick={()=>handleDelete(customer._id)} className='btn btn-ghost flex justify-end  w-1/6 p-1'><i class="fa-solid fa-trash text-2xl text-red-600"></i></button>

                        </Card>

                    ))

                   )
                   :
                   (
                    <h2 className="text-center text-white text-3xl font-semibold">No customer registered</h2>
                   )
                }

                

            </div>
            
            
        </div> 

           
           
      
    </div>
  )
}

export default ManageCustomers
