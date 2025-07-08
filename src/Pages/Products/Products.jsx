import React from 'react'
import Style from "./Products.module.css"
import DisplayProducts from '../../Components/DisplayProducts/DisplayProducts'
const Products = () => {
  return (
    <>
      <h1 className="mb-10   text-3xl text-center md:text-left font-bold text-green-600 ps-5">Products</h1>
      <DisplayProducts/>
    </>
  )
}

export default Products
