import axios from "axios";
axios.defaults.withCredentials = true;


const commonAPI=async(httpMethod,url,reqBody,reqHeader)=>{

    const reqConfig={

        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"},
        // withCredentials: true,


    }

    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })

}

export default commonAPI