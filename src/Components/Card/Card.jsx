import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

const Card = ({ product }) => {
  const { addProductToCart} = useContext(CartContext);
  const {addToWishlist,removeFromWishlist,wishlistProductsIds} = useContext(WishlistContext);
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);

  const isInWishlist = wishlistProductsIds.includes(product._id);

  const handleAddToCart = async () => {
    setLoadingCartId(product._id);
    await addProductToCart(product._id).finally(() => setLoadingCartId(null));
  };

  const handleWishlistToggle = async () => {
    setLoadingWishlistId(product._id);
    if (isInWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
    setLoadingWishlistId(null);
  };
  


  return (
    <div className="group relative group overflow-hidden shadow-md rounded-xl p-4 border border-gray-200 hover:scale-110 hover:border-green-500 transition-transform duration-300 bg-white flex flex-col justify-between h-full">
      
      {/* SALE Badge */}
      {product.priceAfterDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            SALE
          </span>
        </div>
      )}

      {/* Heart Icon */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleWishlistToggle}
          className={`cursor-pointer text-xl transition-colors duration-300 ${
            isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label="Toggle Wishlist"
        >
          {loadingWishlistId === product._id ? (
            <i className="fas fa-spinner fa-spin" />
          ) : (
            <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart`} />
          )}
        </button>
      </div>

      {/* Product Image & Info */}
      <Link to={`/productDetails/${product._id}/${product.category.name}`} className="flex-grow">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
          loading="lazy"
        />

        <div className="px-1">
          <h3 className="text-xs text-green-600 font-medium">{product.category.name}</h3>
          <h2 className="text-sm font-semibold text-gray-800 mt-1 min-h-[38px] line-clamp-2">
            {product.title}
          </h2>

          <div className="flex justify-between items-center mt-3">
            {product.priceAfterDiscount ? (
              <div>
                <p className="line-through text-red-400 text-sm">{product.price} EGP</p>
                <p className="text-sm font-bold text-green-700">{product.priceAfterDiscount} EGP</p>
              </div>
            ) : (
              <p className="text-sm font-bold text-green-700">{product.price} EGP</p>
            )}

            <span className="text-yellow-500 text-sm flex items-center gap-1">
              <i className="fas fa-star" /> {product.ratingsAverage}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loadingCartId === product._id}
        className="translate-y-[250%] group-hover:translate-y-[0] cursor-pointer mt-4 w-full text-sm font-medium rounded-lg py-2 transition-all duration-500 bg-green-500 text-white hover:bg-green-600'"
      >
        {loadingCartId === product._id ? (
          <i className="fas fa-spinner fa-spin" />
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};

export default Card;

