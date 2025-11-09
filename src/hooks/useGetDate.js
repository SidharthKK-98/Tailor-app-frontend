import commonAPI from "../services/commonAPI";
import { BASE_URL } from "../services/constant";



const useGetDate=()=>{

    const getDate=async(orderDetails)=>{
        
        const {deliveryDate}=orderDetails
       console.log(deliveryDate);
       
        

        try{

            
            const url=BASE_URL+'/order/getOrderDate'
            
            const res= await commonAPI("POST",url,{deliveryDate:orderDetails.deliveryDate},"")
            console.log(res);
            alert(res.data.message)
            return res
            
            

        }
        catch(err){
            console.log(err);
            
        }
    }

    return getDate

}

export default useGetDate