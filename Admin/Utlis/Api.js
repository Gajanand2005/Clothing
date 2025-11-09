import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const postData = async (url, formData) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(apiUrl + url, formData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : error;
    }
};

export const fetchDataFromApi = async (url) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        };
        const { data } = await axios.get(apiUrl + url, config);
        return data;
    } catch (error) {
        console.log(error);
        return error.response ? error.response.data : error;
    }
};

export const uploadImage = async (url, updatedData) => {
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    };
    const response = await axios.post(apiUrl + url, updatedData, config);
    return response.data;
};

export const editData = async (url, updatedData) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.put(apiUrl + url, updatedData, config);
    return response.data;
};

export const deleteImages = async (url) => {
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    const { data } = await axios.delete(apiUrl + url, config);
    return data;
};

export const deleteData = async (url) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axios.delete(apiUrl + url, config);
    return data;
};

export const deleteWithData = async (url, data) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };
    const response = await axios.delete(apiUrl + url, config);
    return response.data;
};
