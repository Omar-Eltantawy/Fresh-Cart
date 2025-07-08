import React, { useContext} from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import Card from '../../Components/Card/Card';

const Wishlist = () => {
  const { wishlistData, isLoading } = useContext(WishlistContext);
  const products = wishlistData?.data;

  if (products?.length === 0) {
    return <h2 className="text-center text-3xl text-green-500 font-bold m-5">Your Wishlist is empty!</h2>;
  }

  return (
    <div className="px-5 py-10">
      <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
        Your Wishlist
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {products?.map((product) => (
            <Card key={product._id} product={product} isWishlist={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
