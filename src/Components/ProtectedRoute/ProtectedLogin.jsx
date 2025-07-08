import React, { useContext } from 'react'
import Style from "./ProtectedRoute.module.css"
import { authContext } from '../../Context/AuthContextProvider';
import { Navigate } from 'react-router-dom';
const ProtectedLogin = ({children}) => {
  const {token} = useContext(authContext);;
  
  if(!token){
    return children;
  }else{
    return <Navigate to={"/"} />
  }
}

export default ProtectedLogin
