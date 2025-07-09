import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "./AuthContextProvider";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { token, isVerifying } = useContext(authContext);
  const queryEnabled = !!token && !isVerifying;

  const queryClient = useQueryClient();

  // ---- API Functions ----

  const getCartProducts = async () => {
    const { data } = await axiosInstance.get("/cart");
    return data;
  };

  const addToCartAPI = (productId) => axiosInstance.post("/cart", { productId });

  const removeFromCartAPI = (productId) => axiosInstance.delete(`/cart/${productId}`);

  const clearCartAPI = () => axiosInstance.delete("/cart");

  const updateProductCountAPI = ({ productId, count }) => axiosInstance.put(`/cart/${productId}`, { count });

 const payOnlineAPI = ({ cartId, shippingAddress }) =>
  axiosInstance.post(
    `/orders/checkout-session/${cartId}?url=fresh-cart-theta-nine.vercel.app`,
    { shippingAddress }
  );

  const payCashAPI = ({ cartId, shippingAddress }) =>
    axiosInstance.post(`/orders/${cartId}`, { shippingAddress });

  // ---- Mutations ----

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCartAPI,
    onSuccess: () => {
      toast.success("Removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const updateCountMutation = useMutation({
    mutationFn: updateProductCountAPI,
    onSuccess: () => {
      toast.success("Quantity updated");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const payOnlineMutation = useMutation({
    mutationFn: payOnlineAPI,
    onSuccess: ({ data }) => {
      window.location.href = data.session.url;
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const payCashMutation = useMutation({
    mutationFn: payCashAPI,
    onSuccess: () => {
      toast.success("Cash order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // ---- Queries ----

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartProducts,
    enabled: queryEnabled,
    refetchOnWindowFocus: true,
  });

  // ---- Exposed Methods ----

  const addProductToCart = (productId) => addToCartMutation.mutateAsync(productId);
  const removeProductFromCart = (productId) => removeFromCartMutation.mutateAsync(productId);
  const clearCart = () => clearCartMutation.mutate();
  const updateProductCount = (productId, count) => updateCountMutation.mutate({ productId, count });
  const payOnline = (cartId, shippingAddress) => payOnlineMutation.mutate({ cartId, shippingAddress });
  const payCash = (cartId, shippingAddress) => payCashMutation.mutateAsync({ cartId, shippingAddress });

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProductFromCart,
        clearCart,
        updateProductCount,
        payOnline,
        payCash,
        cartData,
        isCartLoading,
        isAddingLoading: addToCartMutation.isPending,
        isRemovingLoading: removeFromCartMutation.isPending,
        isClearingCartLoading: clearCartMutation.isPending,
        isUpdatingLoading: updateCountMutation.isPending,
        isPayingOnlineLoading: payOnlineMutation.isPending,
        isPayingCashLoading: payCashMutation.isPending,
        cartId: cartData?.data?._id || null,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
