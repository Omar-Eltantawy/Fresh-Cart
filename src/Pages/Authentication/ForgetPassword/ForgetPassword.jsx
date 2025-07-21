import React from 'react'
import Style from "./ForgetPassword.module.css"
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import useAuthMutation from '../../../Hooks/useAuthMutation'
const ForgetPassword = () => {
  const { mutate: forgetPassword, isPending ,isError,error} = useAuthMutation("forgotPasswords","post");

  const navigate = useNavigate();
  let forgetPasswordSchema =yup.object().shape({
    email:yup.string().email("Email is not valid").required("Email is required"),
  })

  const handleForgetPassword=(values)=>{
    forgetPassword(values, {
    onSuccess: () => {
      navigate("/verifyCode")
      toast.success("Check your email");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  });
  }

  const forgetPasswordForm =  useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: handleForgetPassword
  })
  return (
    <>
      <form onSubmit={forgetPasswordForm.handleSubmit} className="max-w-[75%] mx-auto w-full mt-10">
        <h1 className="text-2xl mb-6 font-bold text-green-700">ForgetPassword</h1>
        {isError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{error?.response?.data?.message }</span> 
                    </div>
      }
        <div className="relative z-0 w-full mb-7 group">
            <input type="email" value={forgetPasswordForm.values.email} onChange={forgetPasswordForm.handleChange} onBlur={forgetPasswordForm.handleBlur} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        {forgetPasswordForm.errors.email && forgetPasswordForm.touched.email ?
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{forgetPasswordForm.errors.email}</span> 
          </div>: null}
        
          <button type="submit" disabled={isPending ? true : false} className=" cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isPending ? <i className='fas fa-spin fa-spinner'></i> : "ForgetPassword"}
        </button>
      </form>

    </>
  )
}

export default ForgetPassword
