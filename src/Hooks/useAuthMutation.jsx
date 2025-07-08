import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../utils/axiosInstance'

const useAuthMutation = (endpoint,method) => {
  return useMutation({
    mutationFn:async(values)=>{
        let {data} = await axiosInstance[method](`auth/${endpoint}`,values);
        return data;
    }
  })
}

export default useAuthMutation
