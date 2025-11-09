import commonAPI from "../services/commonAPI";
import { BASE_URL } from "../services/constant";

const usePayment=()=>{

    const URL=BASE_URL+'/payment'

    const createPayment=async(addedItemId,user)=>{

        try{

            const response= await commonAPI('POST',`${URL}/paymentprocess`,{addedItemId},"")
            console.log(response);
            const {id}=response.data
            const apiKey= await commonAPI('GET',`${URL}/getApiKey`,"","")
            const {key}=apiKey.data
            // console.log(key,id);

            const options = {
                key, // Replace with your Razorpay key_id
                amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'Tailors App',
                description: 'Test Transaction',
                order_id:id, // This is the order_id created in the backend
                // callback_url: 'http://localhost:5000/api/payment/paymentVerification', // Your success URL
                prefill: {
                  name: user.username,
                  
                },
                theme: {
                  color: '#F37254'
                },
               
              };
        
              const rzp = new Razorpay(options);
              rzp.open();


              
            
            
        }
        catch(err){
            console.log(err);
            return { success: false, error: err.message };

            
        }
    }

    return createPayment
}

export default usePayment