import React from 'react'
import Style from "./ProductsSkelton.module.css"
const ProductsSkelton = () => {
  return (
    <>
    <div className="parent gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden shadow-sm rounded-lg p-2 space-y-2">
              <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
              <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
                <div className="h-4 bg-gray-300 w-1/5 rounded"></div>
              </div>
              <div className="h-10 bg-gray-300 w-full rounded mt-1"></div>
            </div>
      ))}
    </div>
    </>
  )
}

export default ProductsSkelton
