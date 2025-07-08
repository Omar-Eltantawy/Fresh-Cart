import React, { useState } from 'react'
import Style from "./Register.module.css"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import useAuthMutation from '../../../Hooks/useAuthMutation'
const Register = () => {
  let {mutate:register,isPending,isError,error} = useAuthMutation("signup","post");
  const [showPasword,setShowPassword]= useState("password");
  const [showRePassword, setShowRePassword] = useState("password");
  const togglePasword=()=>{
    setShowPassword(showPasword === 'password'? 'text':"password");
  }
  const toggleRePasword=()=>{
    setShowRePassword(showRePassword === 'password'? 'text':"password");
  }
  const navigate = useNavigate();
  let registerSchema =yup.object().shape({
    name:yup.string().min(3,"Name min 3 char ").max(20,"Name max 20 char").required("Name is required"),
    email:yup.string().email("Email is not valid").required("Email is required"),
    password:yup.string().matches(/^[A-Z][\w\S]{6,15}$/,"Password must start with an uppercase letter, be 7 to 16 characters long, and may include letters, numbers, underscores, or special characters. ").required("Password is required"),
    rePassword:yup.string().oneOf([yup.ref('password')] , "rePassword must match password").required("rePassword is required"),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone must be egyptian phone number').required("Phone is required")
  })
  const handleRegister =async (values)=>{
    register(values,{
      onSuccess:()=>{
        navigate("/")
        toast.success("Your account created successfully");
      },
      onError: (error) => {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message)
      }
    })

  }
  const registerForm =  useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: registerSchema,
    onSubmit: handleRegister
  })
  return (
    <>
      <form onSubmit={registerForm.handleSubmit} className="max-w-[75%] mx-auto w-full">
        <h1 className="text-2xl mb-6 font-bold text-green-700">Register</h1>
        {isError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{error?.response?.data?.message }</span> 
                    </div>
      }
        <div className="relative z-0 w-full mb-7 group">
            <input type="text" value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="name"  id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        </div>
        {registerForm.errors.name && registerForm.touched.name ?
         <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{registerForm.errors.name}</span> 
          </div>: null}
        <div className="relative z-0 w-full mb-7 group">
            <input type="email" value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
        </div>
        {registerForm.errors.email && registerForm.touched.email ?
         <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{registerForm.errors.email}</span> 
          </div>: null}
          <div className="relative z-0 w-full mb-7 group">
            <input
              type={showPasword}
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full pr-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

            {/* SVG Eye Icon */}
            <div
              onClick={togglePasword}
              className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer pr-2 text-gray-600 dark:text-gray-300"
            >
              {showPasword === "text" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </div>
          </div>
        {registerForm.errors.password && registerForm.touched.password ?
         <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{registerForm.errors.password}</span> 
          </div>: null}
          <div className="relative z-0 w-full mb-7 group">
            <input
              type={showRePassword}
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              name="rePassword"
              id="floating_rePassword"
              className="block py-2.5 px-0 w-full pr-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 left-0 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>

            {/* SVG Eye Icon */}
            <div
              onClick={toggleRePasword}
              className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer pr-2 text-gray-600 dark:text-gray-300"
            >
              {showRePassword === "text" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </div>
          </div>
        {registerForm.errors.rePassword && registerForm.touched.rePassword ?
         <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{registerForm.errors.rePassword}</span> 
          </div>: null}
        <div className="relative z-0 w-full mb-7 group">
            <input type="tel" value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        </div>
        {registerForm.errors.phone && registerForm.touched.phone ?
         <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span className="font-medium">{registerForm.errors.phone}</span> 
          </div>: null}
        <button type="submit" disabled={isPending?true:false} className=" cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isPending ? <i className='fas fa-spin fa-spinner'></i> : "Register"}
        </button>
      </form>

    </>
  )
}

export default Register
