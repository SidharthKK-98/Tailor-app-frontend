import React, { useState } from 'react'
import { Button,  Label, TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import Header from '../components/Header'



function Signup() {

  const [role,setRole]=useState("admin")
  const [secretkey,setSecretKey]=useState("")
  
  const [userDetails,setUserDetails]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmPassword:"",
    role:"",

  })
  const{signup}=useSignup()

  // console.log(userDetails);
  

  const handleRole=(e)=>{
    // console.log(e.target.value);
    setRole(e.target.value)
    console.log(role);
    setUserDetails({...userDetails,role:e.target.value})
    
  } 
  const handleSignup=async(e)=>{
    e.preventDefault()
    
    const secretKey=`SID`
    if(role=="admin"){
      
      if(secretKey.trim()==secretkey){
        //api call for signup
        await signup(userDetails)
        alert("signup success")


        setSecretKey("")
        
      }
      else{
        alert("signupkey is wrong")
      }
    }
    else{
      //api call for signup
      await signup(userDetails)
      alert("signup as customer success")


    }
  }
  
  return (

    <div>

      <Header/>

          <div className='flex w-full justify-center items-center h-lvh'>
              
              
                    
              <form  onSubmit={handleSignup} className="flex max-w-md flex-col gap-4 w-full bg-white p-5 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-0" >
              <div className="flex">
              <input type="radio" name="radio-2" className="radio radio-primary " value={"admin"} onChange={handleRole} defaultChecked /><span className='text-white mx-2'>Admin</span>
              <input type="radio" name="radio-2" className="radio radio-primary" value={"customer"} onChange={handleRole} /><span className='text-white mx-2'>Customer</span>
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Your fullname" />
                </div>
                <TextInput id="email1" type="text" placeholder="fullname" required  onChange={e=>(setUserDetails({...userDetails,fullname:e.target.value}))}/>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Your Username" />
                </div>
                <TextInput id="email1" type="text" placeholder="username" required onChange={e=>(setUserDetails({...userDetails,username:e.target.value}))} />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required placeholder="password" onChange={e=>(setUserDetails({...userDetails,password:e.target.value}))}/>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Confirm password" />
                </div>
                <TextInput id="password1" type="password" required placeholder="password" onChange={e=>(setUserDetails({...userDetails,confirmPassword:e.target.value}))} />
              </div>

              {
                role=="admin"&&(

                <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Secret Key" />
                </div>
                <TextInput id="email1" type="password" placeholder="secret key" required onChange={e=>(setSecretKey(e.target.value))}/>
              </div>
                )
              }
              
              
              <Button type="submit " className='bg-blue-600'>SignUp</Button>

              <Link to={'/login'}  className='text-white hover:text-blue-500 flex justify-center mt-5'>Already have an account</Link>

            </form>

            </div>

    </div>
     
  )
}

export default Signup
