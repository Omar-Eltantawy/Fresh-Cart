import React, { useContext, useState } from 'react'
import Style from "./Checkout.module.css"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Checkout = () => {
  // const {payOnline,data:cartData,isPayingOnlineLoading ,payCash,isPayingCashLoading}= useContext(CartContext);
  const {payOnline,cartId,isPayingOnlineLoading,payCash,isPayingCashLoading} = useContext(CartContext);

  const [cashFlag,setCashFlag]= useState(false);
  const navigate = useNavigate();
  let CheckoutSchema =yup.object().shape({
    details: yup.string().required("Must Be Required"),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone must be egyptian phone number').required("Phone is required"),
    city: yup.string().required("Must Be Required")
  })
  const onlineOrder = async (values) => {
  if (!cartId) return toast.error("Cart ID not found");
  payOnline(cartId, values);
};

const cashOreder = (values) => {
  if (!cartId) return toast.error("Cart ID not found");
  payCash(cartId, values).then(() => {
    navigate("/allorders");
  });
};
  const paymentOrder=(values)=>{
    let shippingAddress=values
    if(cashFlag){
      cashOreder(shippingAddress)
    }else{
      onlineOrder(shippingAddress)
    }
  }
  const checkoutForm =  useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: CheckoutSchema,
    onSubmit:paymentOrder,
  })
  return (
    <>
      <form onSubmit={checkoutForm.handleSubmit} className="max-w-[75%] mx-auto w-full">
        <h1 className="text-2xl mb-6 font-bold text-green-700">Pay Now</h1>
        <div className="relative z-0 w-full mb-7 group">
            <input type="text" value={checkoutForm.values.details} onChange={checkoutForm.handleChange} onBlur={checkoutForm.handleBlur} name="details" id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
        </div>
        {checkoutForm.errors.details && checkoutForm.touched.details ?
         <div class="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span class="font-medium">{checkoutForm.errors.details}</span> 
          </div>: null}


        <div className="relative z-0 w-full mb-7 group">
            <input type="tel" value={checkoutForm.values.phone} onChange={checkoutForm.handleChange} onBlur={checkoutForm.handleBlur} name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        </div>
        {checkoutForm.errors.phone && checkoutForm.touched.phone ?
         <div class="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span class="font-medium">{checkoutForm.errors.phone}</span> 
          </div>: null}


        <div className="relative z-0 w-full mb-7 group">
            <input type="text" value={checkoutForm.values.city} onChange={checkoutForm.handleChange} onBlur={checkoutForm.handleBlur} name="city" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
        </div>
        {checkoutForm.errors.city && checkoutForm.touched.city ?
         <div class="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span class="font-medium">{checkoutForm.errors.city}</span> 
          </div>: null}

        <button onClick={()=>setCashFlag(true)} disabled={isPayingOnlineLoading || isPayingCashLoading}   type="submit" className="me-5 cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
           {isPayingCashLoading ? <i className='fas fa-spin fa-spinner'/>: "Pay Cash" }
        </button>
        <button onClick={()=>setCashFlag(false)} disabled={isPayingOnlineLoading || isPayingCashLoading} type="submit" className="me-5 cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
           {isPayingOnlineLoading? <i className='fas fa-spin fa-spinner'/>: "Pay Online"}
        </button>
      </form>
    </>
  )
}

export default Checkout
