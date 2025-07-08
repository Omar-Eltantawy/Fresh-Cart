import React from 'react';

const CartSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
          <div className="w-full sm:w-40 h-32 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32 dark:bg-gray-700"></div>
              <div className="h-3 bg-gray-300 rounded w-20 dark:bg-gray-700"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
                <div className="w-8 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
                <div className="w-8 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
              </div>
              <div className="w-10 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Skeleton for subtotal box */}
      <div className="mt-6 h-full rounded-lg bg-white p-6 shadow-md md:w-1/3">
        <div className="flex justify-between mb-4">
          <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-700"></div>
          <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded dark:bg-gray-700 w-full"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
