import { useState } from "react";
import {  useAuthContext } from "../context/AuthContext";
import commonAPI from "../services/commonAPI";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/constant";


const useSignup=()=>{

    const navigate=useNavigate()
    const {setAuthUser}=useAuthContext()
    const [isLoading, setIsLoading] = useState(false);


    const signup=async ({fullname,username,password,confirmPassword,role})=>{

        const success=handleInputError({fullname,username,password,confirmPassword,role})
        if(!success) return
    

    try{
        const url=BASE_URL+'/auth/signup'
        const reqBody={fullname,username,password,confirmPassword,role}
        const res= await commonAPI("POST",url,reqBody,"")
        console.log(res);
        if(res.status==200){
                if(res.data.role=='admin'){
                    navigate('/adminPage')
                }
                if(res.data.role=='customer'){
                    navigate('/customerPage')
                }
            }
        localStorage.setItem("autherized-user",JSON.stringify(res))
        setAuthUser(res)
        
    }
    catch(err){
        console.log(err);
        
    }
    finally{
        setIsLoading(false)
    }
    }

    return {signup}

}

export default useSignup

function handleInputError({fullname,username,password,confirmPassword,role}){
    if(!fullname || !username || !password || !confirmPassword || !role){
        alert("fill all the fields")
        return false
    }
    if(password!==confirmPassword){
        alert("password not matching")
        return false
    }
    return true
    }