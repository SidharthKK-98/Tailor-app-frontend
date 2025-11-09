import commonAPI from "../services/commonAPI";
import { BASE_URL } from "../services/constant";

const useOrder=()=>{

const orderDetailsFromStorage= JSON.parse(localStorage.getItem("orderDetails"))


    const postOrder=async()=>{

        if(orderDetailsFromStorage){

        try{

            const url=BASE_URL+'/order/orderAdd'
            const response= await commonAPI("POST",url,orderDetailsFromStorage,"")
            localStorage.removeItem("orderDetails")
            console.log(response);//this one have all details
            return response
            

        }
        catch(err){
            console.log(err);
            
        }

    }


    }

    return postOrder


}

export default useOrder