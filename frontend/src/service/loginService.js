import axiosInstance from '../lib/axios.js'

export const getUser = async () => {
    try{
        const response = await axiosInstance.get(`/user/getUser`);
        return response.data.data;
    }catch(err){
        return null;
    }
}

export const createUser = async (data) => {
    try{
        const res =  await axiosInstance.post(`/user/registration`, data);
        return res.data;
    }catch(err){
        console.log(err);
        return { message: "Network Error" };
    }
}

export const loginUser = async (data) => {
    try{
        const res =  await axiosInstance.post(`/user/login`, data);
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
        const res =  await axiosInstance.get(`/user/logout`);
        return res.data;
    }catch(err){
        console.log(err);
        return {
            message:"Network Error",
        };
    }
}