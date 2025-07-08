import React, { useContext } from 'react'
import Style from "./ProtectedRoute.module.css"
import { authContext } from '../../Context/AuthContextProvider';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
  const {token,isVerifying} = useContext(authContext);
  
   if (isVerifying) return <p className="text-center mt-10">🔒 Checking authentication...</p>;
  if(token){
    return children;
  }else{
    return <Navigate to={"/login"} />
  }
}

export default ProtectedRoute
