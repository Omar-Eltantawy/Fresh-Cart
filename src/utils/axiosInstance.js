import axios from "axios";


const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    baseURL:"https://ecommerce.routemisr.com/api/v1",
    headers:{
        token: token || ""
    }
})

