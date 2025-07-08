import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const authContext=createContext();

const AuthContextProvider = ({children}) => {
  const [token,setToken]=useState(localStorage.getItem("token") || null);
  const [isVerifying, setIsVerifying] = useState(true);
  const verifyToken=async(token)=>{
    if (!token) {
      setIsVerifying(false);
      return;
    }
    try{
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token:localStorage.getItem("token")
      },
    });

    localStorage.setItem("userId",data.decoded.id)

    console.log(data);
    
  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    localStorage.removeItem("token");
    setToken(null);
  }finally {
    setIsVerifying(false); // ✅ done verifying
  }    
  }
  useEffect(()=>{
      verifyToken()
    },[])
  return (
    <authContext.Provider value={{token,setToken,isVerifying,verifyToken }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;


