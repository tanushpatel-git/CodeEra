import axios from 'axios'

const backendUrl = import.meta.env.VITE_API_URL

if (!backendUrl) {
    throw new Error("backendUrl is missing");
}

const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true
})

export default axiosInstance
