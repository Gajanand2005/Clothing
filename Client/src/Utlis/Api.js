import axios from 'axios';
import { GiToken } from 'react-icons/gi';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData)=>{
    try {
        const res= await fetch(apiUrl + url,{
            method : 'POST',
             headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in the Authorization header
                'Content-Type' : 'application/json', //adjust the content type as needed
            },
            body: JSON.stringify(formData)
        });

        if(res.ok){
            const data = await res.json();
            return data;
        }else{
            const errorData = await res.json();
            return errorData;
        }

    } catch (error) {
         console.log(error)
    }
}


export const fetchDataFromApi = async (url)=>{
    try {

        const params={
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in the Authorization header
                'Content-Type' : 'application/json', //adjust the content type as needed
            }
        }

        const {data} = await axios.get(apiUrl+ url,params )
        
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editData= async (url, updatedData) => {
       const params={
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`, //include your api key in the Authorization header
                'Content-Type' : 'multipart/form-data', //adjust the content type as needed
            },
        }
        let response;
    await axios.put(apiUrl + url , updatedData, params).then((res)=>{
    response=res;
    })
    return response;
}