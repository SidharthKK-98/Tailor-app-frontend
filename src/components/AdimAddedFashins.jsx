import React from 'react'
import { Card } from "flowbite-react";
import {useAddedItemContext} from '../context/AddedItemContext'
import commonAPI from '../services/commonAPI';
import { BASE_URL } from '../services/constant';


function AdimAddedFashins() {
    const {addedItem,setAddedItem}=useAddedItemContext()

    const handleDelete=(itemId)=>{

      const isConfirmed=window.confirm("Are you sure do you want to delete")

      if(!isConfirmed){
        return
      }

      deleteItem(itemId)

    }



    const deleteItem=async(itemId)=>{

      // console.log(itemId);



      

      try{
          const url=BASE_URL+`/items/deleteItem/${itemId}`
          const res= await commonAPI("DELETE",url)
          console.log(res);
          if(res.status==201){
          alert(res.data)
          }
          if(res.status==200){
            setAddedItem(addedItem.filter(item => item._id !== itemId))
              alert(res.data.message)
          }

      }
      catch(err){
          console.log(err);
          
      }

  }
  
  return (
    <div>

      <div className='flex justify-center h-lvh items-center'>


                    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 m-5">

                {
                      addedItem.length>0?
                      
                        addedItem.map(items=>(

                            


                                <Card
                                     className="max-w-sm bg-white p-2  overflow-y-auto h-[300px]"
                                
                                   >

                                  <img
                                    src={`${BASE_URL}/uploads/${items.itemImg}`}
                                    alt="fashion item"
                                    className="w-full h-[220px] object-cover mt-28 rounded-md shadow-lg" // Adjust width and height here
                                  />

                                      <h5 className="text-2xl font-semibold tracking-tight text-gray-600 dark:text-white">
                                        {items.Type}
                                      </h5>

                                  <div className='flex justify-between'>

                                    <div>
                                         
                                      <p className="font-semibold text-gray-700 dark:text-gray-400">
                                        Fabric : {items.Fabric}
                                      </p>

                                      <p className="font-semibold text-gray-700 dark:text-gray-400">
                                        {items.Description}
                                      </p>
                                      <p className="font-semibold text-gray-700 dark:text-gray-400">
                                        Price : RS {items.Price}
                                      </p>

                                    </div>
                                    
                                    <button onClick={()=>handleDelete(items._id)} className='btn btn-ghost flex justify-end  w-1/6 p-1'><i class="fa-solid fa-trash text-2xl text-red-600"></i></button>


                                  </div>
                                
                                
                              </Card>

                      

                              
                            )
                        


                      )
                      :
                      (
                        <p>No items added yet.</p>
                      )

              }


              </div>



      </div>

        

    </div>
  )
}

export default AdimAddedFashins
