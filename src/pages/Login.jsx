import React, { useEffect, useState } from 'react'
import { Button,  Label, TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Header from '../components/Header'


function Login() {

  const [loginDetails,setLoginDetails]=useState({username:"",password:"",role:""})
  const [role,setRole]=useState("admin")
  const {login}=useLogin()

  useEffect(() => {
    setLoginDetails((loginDetails) => ({ ...loginDetails, role }));
  }, [role]);

  const handleRole=(e)=>{
    // console.log(e.target.value);
    setRole(e.target.value)
    // console.log(role);
    setLoginDetails({...loginDetails,role:e.target.value})
    console.log(loginDetails.role);
    
    
  } 

  const handleLogin=async(e)=>{
    e.preventDefault()
    await login(loginDetails)

  }


  return (

  <div>

    <Header/>

      <div className='flex w-full justify-center items-center h-lvh'>


            
      <form  className="flex max-w-md flex-col gap-4 w-full bg-white p-5 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-0" >
      <div className="flex">
      <input type="radio" name="radio-2" className="radio radio-primary " value={"admin"} onChange={handleRole} defaultChecked /><span className='text-white mx-2'>Admin</span>
      <input type="radio" name="radio-2" className="radio radio-primary" value={"customer"} onChange={handleRole} /><span className='text-white mx-2'>Customer</span>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your username" />
        </div>
        <TextInput id="email1" type="text" placeholder="username" required onChange={e=>setLoginDetails({...loginDetails,username:e.target.value})} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required placeholder="password" onChange={e=>setLoginDetails({...loginDetails,password:e.target.value})}/>
      </div>

      <Button onClick={handleLogin} type="submit " className='bg-blue-600'>Login</Button>

      <Link to={'/signup'}  className='text-white hover:text-blue-500 flex justify-center mt-5'>Dont have an account</Link>

      </form>

      </div>


   </div>
    
  )
}

export default Login
