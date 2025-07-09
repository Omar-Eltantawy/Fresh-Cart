import axios from "axios";


const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_API_URL,
    headers:{
        token: token || ""
    }
})

