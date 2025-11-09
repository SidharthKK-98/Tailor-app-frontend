import { useAuthContext } from "../context/AuthContext";
import commonAPI from "../services/commonAPI";
import { BASE_URL } from "../services/constant";

const useLogout=()=>{
    const{setAuthUser}=useAuthContext()

    const logout=async()=>{

        try{
            const url=BASE_URL+'/api/auth/logout'
            const res=await commonAPI("POST",url,"","")
            localStorage.removeItem("autherized-user")
            setAuthUser(null)
    
        }
        catch(err){
            console.log(err);
            
        }

    }
   
    return{logout}
}

export default useLogout