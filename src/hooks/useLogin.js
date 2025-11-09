import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import commonAPI from "../services/commonAPI";
import { BASE_URL } from "../services/constant";

const useLogin=()=>{
    const navigate=useNavigate()
    const {setAuthUser}=useAuthContext()


    const login=async({username,password,role})=>{
        const success=handleInputError({username,password,role})
        if(!success) return

        try{
            const url=BASE_URL+"/auth/login"
            const reqBody={username,password,role}
            const res= await commonAPI("POST",url,reqBody,"")

            if(res.status==200){
                if(res.data.role=='admin'){
                    navigate('/adminPage')
                }
                if(res.data.role=='customer'){
                    navigate('/customerPage')
                }
            
            }
            if(res.status==401){
                alert("invalid username or password")
                return
            }
            localStorage.setItem("autherized-user",JSON.stringify(res))
            setAuthUser(res)

        }
        catch(err){
            console.log(err);
            
        }
    }

    return {login}
}

export default useLogin

function handleInputError({username,password,role}){
    if(!username || !password || !role){
        alert("fill all the fields")
        return false
    }
    return true
}

