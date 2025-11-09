import React, { useEffect } from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import upload from '../assets/upload.png'
import AdimAddedFashins from '../components/AdimAddedFashins';
import {useAddedItemContext} from '../context/AddedItemContext'
import { useAuthContext } from '../context/AuthContext'
import commonAPI from '../services/commonAPI';
import { BASE_URL } from '../services/constant';

function FashionAndFabrics() {

  const [openModal, setOpenModal] = useState(false);
  const [fileStatus,setFileStatus]=useState(false)
  const {addedItem,setAddedItem}=useAddedItemContext()
  const {authUser}=useAuthContext()

  const [preview,setPreview]=useState(upload)
  

  const [itemDetails,setItemDetails]=useState({itemImg:"",Type:"",Fabric:"",Description:"",Price:""})
  // console.log(itemDetails);
  // console.log(addedItem);
  
  

  useEffect(() => {

    if(itemDetails.itemImg.type=='image/png' || itemDetails.itemImg.type=='image/jpg' || itemDetails.itemImg.type=='image/jpeg' ){
      setFileStatus(true)
      setPreview(URL.createObjectURL(itemDetails.itemImg))

    }
    else{
      setFileStatus(false)
      setItemDetails({...itemDetails,itemImg:""})
      setPreview(upload)
    }
   
  }, [itemDetails.itemImg])

  useEffect(() => {

    handleGetItems()
   
  }, [itemDetails])
  
  

  const handleAddItems=async()=>{

    const{itemImg,Type,Fabric,Description,Price}=itemDetails

    if(!itemImg || !Type || !Fabric || !Description || !Price){
      alert("Fill all fields")
      return
    }
    

      const reqBody=new FormData()
      reqBody.append('itemImg',itemImg)
      reqBody.append('Type',Type)
      reqBody.append('Fabric',Fabric)
      reqBody.append('Description',Description)
      reqBody.append('Price',Price)

    

    if(authUser && authUser.data && authUser.data.role==='admin'){
      const reqHeader={
        "content-type" :"multipart/form-data"
      }
    

    try{
      const url='http://localhost:5000/api/items/fashionAndFabricAdd'
      const res=await commonAPI("POST",url,reqBody,reqHeader)
      console.log(res);

      if(res.status=='406')
      alert("item already added")
      if(res.status=='200'){
        alert('item added successfully')
        setOpenModal(false)
        handleGetItems()

      }
      

    }
    catch(err){
      console.log(err);
      
    }
  }




  }

  const handleGetItems=async()=>{

   
    

    try{



      const url=BASE_URL+'/items/fashionAndFabricGet'
      const res=await commonAPI("GET",url,"","")
      console.log(res);
      
      if(res.status=='200')
      setAddedItem(res.data)
    


    }
    catch(err){
      console.log(err);
      
    }
  }

  

  

  return (
    <div className='bg-slate-800'>
      <button className='btn  m-5' onClick={() => setOpenModal(true)}>Add Fashion</button>

      {/* Modal */}

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header ><h3 className='text-gray-600 font-semibold'>Add Cloth Details</h3></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
               <label className='flex justify-center' >
                    <input  type="file" onChange={e=>setItemDetails({...itemDetails,itemImg:e.target.files[0]})} style={{display:"none"}}/>
                    <img
                    
                     src={preview} alt="" />

                     
                </label>
                    {
                      !fileStatus &&

                      <div className="text-warning fw-bolder">
                      *only allow png,jpg,jpeg file types
                    </div>
                    }

              <form >

                   <div>
                        <label className='label p-2'>
                        <span className='text-base'>Type</span>

                        </label>
                        <input type="text" placeholder='enter fashion type' onChange={e=>setItemDetails({...itemDetails,Type:e.target.value.toUpperCase()})}  className='w-full input input-bordered bg-gray-400 h-10 text-black' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>Fabric</span>

                        </label>
                        <input type="text" placeholder='enter fabric' onChange={e=>setItemDetails({...itemDetails,Fabric:e.target.value.toUpperCase()})}   className='w-full input input-bordered bg-gray-400 h-10  text-black' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>description</span>

                        </label>
                        <textarea type="text" placeholder='About the cloth' onChange={e=>setItemDetails({...itemDetails,Description:e.target.value})}  className='w-full input input-bordered bg-gray-400 h-10  text-black' />
                    </div>

                    <div>
                        <label className='label p-2'>
                        <span className='text-base'>price</span>

                        </label>
                        <input type="text" placeholder='enter price' onChange={e=>setItemDetails({...itemDetails,Price:e.target.value})}   className='w-full input input-bordered bg-gray-400 h-10  text-black' />
                    </div>
                   
                    
              </form>      
           
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-green-500' onClick={ handleAddItems}>Add</Button>
          {/* <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button> */}
        </Modal.Footer>
      </Modal>

      <AdimAddedFashins/>

    </div>
  )
}

export default FashionAndFabrics
