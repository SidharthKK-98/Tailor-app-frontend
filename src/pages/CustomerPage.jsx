import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import commonAPI from '../services/commonAPI';
import {useAddedItemContext} from '../context/AddedItemContext'
import usePayment from '../hooks/usePayment'
import useGetDate from '../hooks/useGetDate';
import { useAuthContext } from '../context/AuthContext'
import useOrder from '../hooks/useOrder';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/constant';




function CustomerPage() {

  const [insideCustomerPage,setInsideCustomerPage]=useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [deliveryDate,setDeliveryDate]=useState(null)
  const [uniqueFabric,setUniqueFabric]=useState([])
  const {addedItem}=useAddedItemContext()
  const [selectedItems,setSelectedItems]=useState([])
  const [selectedItem,setSlectedItem]=useState(null)
  const SERVER_URL='http://localhost:5000'
  const createPayment=usePayment()
  const getDate=useGetDate()
  const postOrder=useOrder()
  const {authUser}=useAuthContext()
  const [blocked,setBlocked]=useState(false)
  const navigate = useNavigate();

  
  
  

  
  

  useEffect(() => {
    setOrderDetails((prevOrderDetails) => ({
        ...prevOrderDetails,
        deliveryDate: deliveryDate, 
        addedItemId:selectedItem? selectedItem._id:null  
    }));
}, [deliveryDate, selectedItem]); 

  
  const [orderDetails,setOrderDetails]=useState({chest:"",waist:"",length:"",sleeve:"",inseam:"",shoulder:"",deliveryDate:"",addedItemId:""})

  

  useEffect(() => {

    getUniqueFabric()
    
  }, [addedItem])

  useEffect(() => {

    const timer=setTimeout(() => {

      getCustomerStatus(authUser?.data._id)

    }, 1000);
    return ()=>clearTimeout(timer)
   
  }, [])
  

  
  
  

  

  const getUniqueFabric=async()=>{

    try{

      const url=BASE_URL+'/items/fashionAndFabricGetUnique'
      const res= await commonAPI('GET',url,"","")
      // console.log(res);
      setUniqueFabric(res.data)
      

    }
    catch(err){
      console.log(err);
      
    }

  }

  const getItemsByFabric=async(fabric)=>{

    try{
      const url=BASE_URL+`/items/fashionAndFabricGetItemByFabric/${fabric}`
      const res=await commonAPI("GET",url,"","")
      // console.log(res.data);
      setSelectedItems(()=>res.data)
      console.log(selectedItems);
      
      

    }
    catch(err){
      console.log(err);
      
    }

  }

  const getCustomerStatus=async(id)=>{

   
    try{

        const url=BASE_URL+'/getUsers/getUserBlockStatus'
        const res=await commonAPI("GET",`${url}/${id}`,"","")
        console.log(res);
        setBlocked(res.data.block)
        

    }
    catch(err){
      console.log(err);
      
    }

  }

  const handleSelectedSingleItem=async(item)=>{
   
    //blocked customer cant do this
   
    
    if(blocked){
      alert("you can't make orders,Admin blocked you")
      return
    }
    setSlectedItem(item)
    setOpenModal(true)
  }

  const handleOrder=async()=>{

    const { chest, waist, length, sleeve, inseam, shoulder,deliveryDate } = orderDetails;
    console.log(orderDetails);
    

    const filledFields=[chest,waist,length,sleeve,inseam,shoulder].filter(values=>values.trim()!=="")

    if(filledFields.length<2 || !deliveryDate){
      alert("fill the fields")
      return
    }
    const date= new Date()
    const today=new Date(date.toISOString().split("T")[0]) // Set today's date as the minimum value
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    

    if(new Date(deliveryDate)<=today){
      alert("choose another date")
      return
    }
    if(new Date(deliveryDate)<=futureDate){
      alert("choose delivery date atleast 7 days from today")
      return
    }
    
   const res= await getDate(orderDetails)//check already added dates
   console.log(res);

   if(res.status==201){
    setOpenModal(true)

   }


   if(res.status==200){
    setOpenModal(false)
    await postOrder(orderDetails)
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    await createPayment(orderDetails.addedItemId,authUser)//direct to payment
    navigate("/customerOrder")
   }

   

   

    
    
    

  }
  

  return (
    <div>
      <Header insideCustomerPage={insideCustomerPage}/>
      <div className="flex justify-center">
        <h1 className='font-bold text-white  p-5 text-4xl'>SELECT YOUR STYLE</h1>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">

        {
          uniqueFabric.length>0?(

              uniqueFabric.map(fabric=>(
                <button className='btn btn-outline text-xl font-bold shadow-2xl text-gray-400 m-5'onClick={()=>getItemsByFabric(fabric)}>{fabric}</button>

              ))

          ):
          (
            <p>No Styles Added By Admin</p>
          )
        }


      </div>


      <div className='flex justify-center h-lvh items-center '>

          {/* card */}

            <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 m-5 ">
                {
                  selectedItems.length>0?(
                    selectedItems.map((items,index)=>(

                      <Card
                          className="max-w-sm bg-white p-4  overflow-y-auto h-[300px] shadow-2xl"
                          key={items._id}
                        >

                            <img
                              src={`${SERVER_URL}/uploads/${items.itemImg}`}
                              alt="fashion item"
                              className="w-full h-[220px] object-cover mt-52 rounded-md shadow-lg" // Adjust width and height here
                            />
                          
                          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {items.Type}
                          </h5>

                          
                          <p className="font-semibold text-gray-700 dark:text-gray-400">
                            Fabric : {items.Fabric}
                          </p>

                          <p className="font-semibold text-gray-700 dark:text-gray-400">
                            {items.Description}
                          </p>
                          <p className="font-semibold text-gray-700 dark:text-gray-400">
                            Price : RS {items.Price}
                          </p>
                          <button className='btn btn-outline flex justify-center  w-1/2 mb-5 ' onClick={() => handleSelectedSingleItem(items)}>Order</button>

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
      

            {/* modal */}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedItem?.Type}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <h2 className='text-black font-semibold'>Add measurments in cm</h2>
              <form >
                <div className='grid grid-cols-2'>

                   <div>
                        <label className='label p-2'>
                        <span className='text-base'>chest</span>

                        </label>
                        <input type="text" placeholder='enter'  onChange={e=>setOrderDetails({...orderDetails,chest:e.target.value})} className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>waist</span>

                        </label>
                        <input type="text" placeholder='enter ' onChange={e=>setOrderDetails({...orderDetails,waist:e.target.value})}  className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>length</span>

                        </label>
                        <input type="text" placeholder='enter 'onChange={e=>setOrderDetails({...orderDetails,length:e.target.value})}  className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>sleeve length</span>

                        </label>
                        <input type="text" placeholder='enter ' onChange={e=>setOrderDetails({...orderDetails,sleeve:e.target.value})}  className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>inseam</span>

                        </label>
                        <input type="text" placeholder='enter ' onChange={e=>setOrderDetails({...orderDetails,inseam:e.target.value})}  className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>shoulder length</span>

                        </label>
                        <input type="text" placeholder='enter ' onChange={e=>setOrderDetails({...orderDetails,shoulder:e.target.value})}  className='w-1/2 input input-bordered bg-white  h-10' />
                    </div>




                </div>
             
              </form>

              <div className='mt-4'>
              <h2 className='text-black font-semibold'>select delivery date</h2>
              
                {/* <SelectDate setDeliveryDate={setDeliveryDate}/>         */}
                 <input type="date" onChange={e=>setDeliveryDate(e.target.value)} min={new Date().toISOString().split("T")[0]} placeholder='enter '  className='w-1/2 input input-bordered bg-white  h-10' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrder }>Confirm Order</Button>
          {/* <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button> */}
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default CustomerPage
