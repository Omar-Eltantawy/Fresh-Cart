import { createContext, useContext } from "react";
import { authContext } from "./AuthContextProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";


export const WishlistContext= createContext();

const WishlistContextProvider = ({children}) => {
  const { token, isVerifying } = useContext(authContext);
  const queryEnabled = !!token && !isVerifying;
  const queryClient = useQueryClient();
  
  const addToWishlistAPI=(productId)=> axiosInstance.post("/wishlist",{productId});
  const getWishlist=async()=>{
    const  {data}= await axiosInstance.get("/wishlist")
    return data
  };
  const removeFromWishlistAPI=(productId)=> axiosInstance.delete(`/wishlist/${productId}`);

  const addToWishlistMutation=useMutation({
    mutationFn: addToWishlistAPI,
    onSuccess:({data})=>{
        toast.success(data.message);
        queryClient.invalidateQueries({queryKey:['wishlist']});
    },
    onError:(error)=>toast.error(error?.response?.data?.message || "Failed to add to wishlist")
  });

  const removeFromWishlistMutation=useMutation({
    mutationFn:removeFromWishlistAPI,
    onSuccess:()=>{
      toast.success("product deleted from wishlist successfully");
      queryClient.invalidateQueries({queryKey:['wishlist']});
    },
    onError:(error)=>toast.error(error?.response?.data?.message || "Failed to remove product from wishlist")
  })


  const {data:wishlistData , isLoading } =useQuery({
    queryKey:['wishlist'],
    queryFn: getWishlist,
    enabled:queryEnabled,
    refetchOnWindowFocus:true
  })


   const wishlistProductsIds = wishlistData?.data?.map((item)=> item._id) || []; 
  const addToWishlist =(productId)=> addToWishlistMutation.mutateAsync(productId);
  const removeFromWishlist=(productId)=> removeFromWishlistMutation.mutateAsync(productId);

  return (
    <WishlistContext.Provider
     value={
      {addToWishlist,
        wishlistData,
        isLoading,
        removeFromWishlist,
        wishlistProductsIds,
        isAddingLoading:addToWishlistMutation.isPending,
        isRemovingLoading:removeFromWishlistMutation.isPending
      }}>
        {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContextProvider
