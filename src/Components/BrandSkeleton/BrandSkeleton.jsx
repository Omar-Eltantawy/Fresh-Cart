import React from 'react';

const BrandSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center animate-pulse">
          <div className="bg-gray-300 h-24 w-24 rounded-full mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default BrandSkeleton;
