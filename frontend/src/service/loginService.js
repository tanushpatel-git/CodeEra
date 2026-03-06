import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const getUser = async () => {
    try{
        const response = await axios.get(`${API_URL}/user/getUser`, {
            withCredentials: true
        });
        return response.data;
    }catch(err){
        return null;
    }
}

export const createUser = async (data) => {
    try{
        const res =  await axios.post(`${API_URL}/user/registration`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res.data;
    }catch(err){
        console.log(err);
        return { message: "Network Error" };
    }
}

export const loginUser = async (data) => {
    try{
        const res =  await axios.post(`${API_URL}/user/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return res.data;
    }catch(err){
        console.log(err);
        return {
            message:"Network Error",
            data:{
                message:"Network Error",
                name:"Login Error",
            }
        }
    }
}

export const logOutUser = async () => {
    try{
        const res =  await axios.get(`${API_URL}/user/logout`, {
            withCredentials: true
        });
        return res.data;
    }catch(err){
        console.log(err);
        return {
            message:"Network Error",
        };
    }
}