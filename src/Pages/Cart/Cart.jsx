import React, { useContext, useState } from 'react';
import Style from "./Cart.module.css";
import { CartContext } from '../../Context/CartContext';
import CartSkeleton from '../../Components/CartSkeleton/CartSkeleton';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cartData,
    isCartLoading,
    removeProductFromCart,
    clearCart,
    isClearingCartLoading,
    updateProductCount,
    isUpdatingLoading
  } = useContext(CartContext);

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    await removeProductFromCart(productId);
    setRemovingId(null);
  };

  const products = cartData?.data?.products || [];
  const totalPrice = cartData?.data?.totalCartPrice || 0;

  if (isCartLoading) return <CartSkeleton />;

  if (products.length === 0) {
    return <h2 className="text-center text-3xl text-green-500 font-bold m-5">Your cart is empty!</h2>;
  }

  return (
    <>
      <h1 className="mb-10 text-3xl text-center md:text-left font-bold text-green-600 ps-5 animate-fade-in">Cart Items</h1>
      <div className='bg-gray-100 p-8'>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 animate-fade-in">
          <div className="rounded-lg md:w-2/3 ">
            {products?.map((product) => (
              <div key={product._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={product.product.imageCover}
                  alt={product.product.title}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        disabled={isUpdatingLoading || product.count === 1}
                        onClick={() => updateProductCount(product.product._id, product.count - 1)}
                        className={`${isUpdatingLoading || product.count === 1 ? "cursor-not-allowed" : "cursor-pointer"} rounded-l bg-gray-100 py-1 px-3.5 duration-100 border border-green-500 hover:bg-green-500 hover:text-white`}
                      >
                        -
                      </button>
                      <input
                        className="border border-green-500 h-8 w-8 bg-white text-center text-xs outline-none"
                        type="number"
                        value={product.count}
                        readOnly
                      />
                      <button
                        disabled={isUpdatingLoading}
                        onClick={() => updateProductCount(product.product._id, product.count + 1)}
                        className={`${isUpdatingLoading ? "cursor-not-allowed" : "cursor-pointer" } rounded-r bg-gray-100 py-1 px-3 duration-100 border border-green-500 hover:bg-green-500 hover:text-white`}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-green-500 font-semibold">{product.price} EGP</p>
                      {/* <button
                        onClick={() => removeProductFromCart(product.product._id)}
                        disabled={isRemovingLoading}
                        aria-label="Remove product"
                        className={`${isRemovingLoading ? 'cursor-not-allowed' : 'cursor-pointer'} text-gray-500 hover:text-red-500`}
                      >
                        {isRemovingLoading ?(<i className="fas fa-spinner fa-spin" /> )
                        :(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>)}
                      </button> */}
                      <button
                          onClick={() => handleRemove(product.product._id)}
                          disabled={removingId === product.product._id}
                          aria-label="Remove product"
                          className={`${removingId === product.product._id ? 'cursor-not-allowed' : 'cursor-pointer'} text-gray-500 hover:text-red-500`}
                        >
                          {removingId === product.product._id ? (
                            <i className="fas fa-spinner fa-spin" />
                          ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg> )}
                        </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-full rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="mb-1 text-lg font-bold">{totalPrice} EGP</p>
            </div>
            <Link to="/checkout">
              <button className="cursor-pointer mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-white hover:bg-green-600">
                Check out
              </button>
            </Link>
            <button
              onClick={clearCart}
              disabled={isClearingCartLoading}
              className={`mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded disabled:opacity-60 ${isClearingCartLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isClearingCartLoading ? <i className='fas fa-spin fa-spinner' /> : "Clear Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
