import React from 'react';
import useGetApis from '../../Hooks/useGetApis';
import BrandSkeleton from '../BrandSkeleton/BrandSkeleton';
const Brands = () => {
  const { data, isLoading, isError, error } = useGetApis("brands");

  if (isLoading) {
    return (
      <div className="mx-auto px-4">
        <h1 className="mb-10 text-3xl text-center md:text-left font-bold text-green-600 ps-5">Brands</h1>
        <BrandSkeleton count={24} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-10 text-red-600 text-xl">
        <i className="fas fa-exclamation-triangle"></i> {error.message}
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-10 text-3xl text-center md:text-left font-bold text-green-600 ps-5">Brands</h1>
      <div className="mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-in">
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((brand) => (
              <div
                key={brand._id}
                className="cursor-pointer bg-white shadow-md hover:scale-105 hover:border hover:border-green-700 transition-transform duration-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4"
              >
                <img src={brand.image} alt={brand.name} className="h-24 object-contain mb-3" />
                <h2 className="text-sm font-semibold text-gray-700">{brand.name}</h2>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No brands found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Brands;
