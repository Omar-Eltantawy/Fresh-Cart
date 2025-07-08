import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Products from './Pages/Products/Products'
import Cart from './Pages/Cart/Cart'
import Register from './Pages/Authentication/Register/Register'
import Login from './Pages/Authentication/Login/Login'
import NotFound from './Pages/NotFound/NotFound'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout'
import AllOrders from './Pages/AllOrders/AllOrders'
import ProtectedLogin from './Components/ProtectedRoute/ProtectedLogin'
import ForgetPassword from './Pages/Authentication/ForgetPassword/ForgetPassword'
import ResetPassword from './Pages/Authentication/ResetPassword/ResetPassword'
import VerifyCode from './Pages/Authentication/VerifyCode/VerifyCode'
import Wishlist from './Pages/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'

function App() {
  let router=createBrowserRouter([
    {path:"",element:<Layout />,children:[
      {path:"/",element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:"brands",element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"checkout",element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:"allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:"productDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"register",element:<ProtectedLogin><Register/></ProtectedLogin> },
      {path:"login",element:<ProtectedLogin><Login/></ProtectedLogin> },
      {path:"forgetPassword",element:<ProtectedLogin><ForgetPassword/></ProtectedLogin> },
      {path:"resetPassword",element:<ProtectedLogin><ResetPassword/></ProtectedLogin> },
      {path:"verifyCode",element:<ProtectedLogin><VerifyCode/></ProtectedLogin> },
      {path:"*",element:<NotFound/>},
    ]},
  ]);

  let client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={router}/>
              <Toaster/>
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
