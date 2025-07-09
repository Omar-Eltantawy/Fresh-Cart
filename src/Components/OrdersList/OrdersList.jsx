import React from 'react';

const OrdersList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <h2 className="text-center text-3xl text-green-600 font-bold m-5">No Orders Found!</h2>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6">All Orders</h2>
      
      {orders.map((order, idx) => (
        <div key={order._id} className="bg-white border border-green-600 rounded-lg shadow-md mb-8 p-6">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Order #{idx + 1}</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>Paid: <span className={order.isPaid ? "text-green-600 font-medium" : "text-red-600"}>{order.isPaid ? "Yes" : "No"}</span></p>
              <p>Delivered: <span className={order.isDelivered ? "text-green-600 font-medium" : "text-red-600"}>{order.isDelivered ? "Yes" : "No"}</span></p>
              <p>Total: <span className="font-bold text-black">{order.totalOrderPrice} EGP</span></p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Shipping Address:</p>
            <p className="text-sm text-gray-700">{order.shippingAddress.details}, {order.shippingAddress.city}</p>
            <p className="text-sm text-gray-700">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-green-700">Items:</h4>
            {order.cartItems.length === 0 ? (
              <p className="text-gray-500 italic">No items in this order.</p>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {order.cartItems.map(item => (
                  <div key={item._id} className="flex items-center gap-4 border rounded-lg p-3">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h5 className="font-medium">{item.product.title}</h5>
                      <p className="text-sm text-gray-600">Count: {item.count}</p>
                      <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
