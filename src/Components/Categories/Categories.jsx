import React from 'react';
import Style from "./Categories.module.css";
import useGetApis from '../../Hooks/useGetApis';
import CategorySkeleton from '../CategorySkeleton/CategorySkeleton';

const Categories = () => {
  const { data, isLoading, isError, error } = useGetApis("categories");

  if (isLoading) {
    return (
      <div className="mx-auto px-4">
        <h1 className="mb-10 text-3xl text-center md:text-left font-bold text-green-600 ps-5">Categories</h1>
        <CategorySkeleton count={8} />
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
      <h1 className="mb-10 text-3xl text-center md:text-left font-bold text-green-600 ps-5">Categories</h1>
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((cat) => (
              <div key={cat._id} className="cursor-pointer bg-white shadow-md hover:scale-110 transition-transform duration-300 rounded-lg overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-green-600">{cat.name}</h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No categories found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
