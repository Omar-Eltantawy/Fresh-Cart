import React from 'react'
import Style from "./AllOrders.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import OrdersList from '../../Components/OrdersList/OrdersList'
const AllOrders = () => {
  const userId= localStorage.getItem("userId")
  const getAllOrders=async()=>{
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    console.log(data);
    
    return data
  }
  let {data,isLoading,isError,error}=useQuery({
    queryKey:["orders"],
    queryFn:getAllOrders
  })
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-600 mt-10">Error: {error.message}</p>;

  return (
    <>
    <OrdersList orders={data} />;
    </>
  )
}

export default AllOrders
