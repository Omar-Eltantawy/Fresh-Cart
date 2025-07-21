import React from 'react'
import Style from "./VerifyCode.module.css"
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import useAuthMutation from '../../../Hooks/useAuthMutation'
const VerifyCode = () => {
  const { mutate: verifyCode, isPending ,isError,error} = useAuthMutation("verifyResetCode","post");

  const navigate = useNavigate();
  let verifyCodeSchema =yup.object().shape({
    resetCode:yup.string().required("Code is required"),
  })

  const handleVerifyCode=(values)=>{
    verifyCode(values, {
    onSuccess: () => {
      navigate("/resetPassword")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  });
  }

  const verifyCodeForm =  useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: verifyCodeSchema,
    onSubmit: handleVerifyCode
  })
  return (
    <>
      <form onSubmit={verifyCodeForm.handleSubmit} className="max-w-[75%] mx-auto w-full mt-10">
        <h1 className="text-2xl mb-6 font-bold text-green-700">Verify Code</h1>
        {isError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{error?.response?.data?.message }</span> 
                    </div>
      }
        <div className="relative z-0 w-full mb-7 group">
            <input type="resetCode" value={verifyCodeForm.values.resetCode} onChange={verifyCodeForm.handleChange} onBlur={verifyCodeForm.handleBlur} name="resetCode" id="floating_code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_code" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code</label>
        </div>
        {verifyCodeForm.errors.resetCode && verifyCodeForm.touched.resetCode ?
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{verifyCodeForm.errors.resetCode}</span> 
          </div>: null}
        
          <button type="submit" disabled={isPending ? true : false} className=" cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isPending ? <i className='fas fa-spin fa-spinner'></i> : "Verify Code"}
        </button>
      </form>

    </>
  )
}

export default VerifyCode
