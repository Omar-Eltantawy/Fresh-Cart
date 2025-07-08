import React  from 'react'
import Style from "./DisplayProducts.module.css"
import ProductsSkelton from '../ProductsSkelton/ProductsSkelton';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import useGetApis from '../../Hooks/useGetApis';
const DisplayProducts = () => {
  const {data,isLoading,isError,error}= useGetApis("products");
  return (
    <>
    {isError && <div className='text-red-500 text-center'>Error: {error.message}</div>}
    {isLoading? (<ProductsSkelton/>):(
      <div className="parent gap-x-5 gap-y-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 animate-fade-in ">
        {data?.data?.data?.map((product)=>(
        <Card key={product._id} product={product} />
      ))}
      </div>     
    )}
      
    </>
  )
}

export default DisplayProducts
