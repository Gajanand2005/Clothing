import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData)=>{
    try {
        const res= await fetch(apiUrl + url,{
            method : 'POST',
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem("token")}`, //include your api key in the Authorization
                'Content-type' : 'application/json', //adjust the content type as needed
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
        const {data} = await axios.get(apiUrl+ url, 
            {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`, //include your api key in the Authorization
                'Content-type' : 'application/json', //adjust the content type as needed
            },
        )
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}