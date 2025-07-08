import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../utils/axiosInstance';

const useGetApis = (endpoint) => {
  let {data,isLoading,isError,error} =useQuery({
    queryKey:[endpoint],
    queryFn:()=>{
      return axiosInstance.get(`/${endpoint}`);
    }
  })
  return {data,isLoading,isError,error}
}

export default useGetApis
