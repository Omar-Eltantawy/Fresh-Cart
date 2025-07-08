import React, { useContext} from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import Card from '../Card/Card'
import ProductsSkelton from '../ProductsSkelton/ProductsSkelton'
import { WishlistContext } from '../../Context/WishlistContext'

const ProductDetails = () => {
  const { addProductToCart, isAddingLoading } = useContext(CartContext);
  const {addToWishlist} = useContext(WishlistContext);
  const { id } = useParams();

  const getSProductDetails = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return data.data;
  };

  const getRelatedProducts = async (categoryName) => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return data.data.filter(p => p.category.name === categoryName && p._id !== id);
  };

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getSProductDetails
  });

  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['relatedProducts', product?.category?.name],
    queryFn: () => getRelatedProducts(product.category.name),
    enabled: !!product?.category?.name
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="p-6">
      {/* Product */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6 mb-12">
        {/* Image Slider */}
        <div className="w-full md:w-1/2">
          {isProductLoading ? (
            <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <Slider {...sliderSettings}>
              {product?.images.map((img, i) => (
                <img key={i} src={img} alt="product" className="rounded-lg h-96 w-full object-cover" />
              ))}
            </Slider>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 relative">
          <h1 className="text-2xl font-bold text-gray-800 uppercase">{product?.title}</h1>
          <p className="text-gray-600">{product?.description}</p>
          <div className="text-green-500 font-medium">{product?.category?.name}</div>

          {/* Price */}
          <div className="flex items-center gap-4">
            {product?.priceAfterDiscount ? (
              <>
                <span className="line-through text-red-400">{product.price} EGP</span>
                <span className="font-bold text-xl">{product.priceAfterDiscount} EGP</span>
              </>
            ) : (
              <span className="font-bold text-xl">{product?.price} EGP</span>
            )}
            <span className="text-yellow-500"><i className="fas fa-star" /> {product?.ratingsAverage}</span>
          </div>

          {/* Wishlist */}
          <button
            onClick={()=>addToWishlist(product?._id)}
            className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500 transition cursor-pointer"
          >
            {/* <i className={inWishlist ? "fas fa-heart" : "far fa-heart"}></i> */}
            <i className= "fas fa-heart"></i>
          </button>

          {/* Add to Cart */}
          <button
            onClick={() => addProductToCart(product._id)}
            disabled={isAddingLoading}
            className={`mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 ${
              isAddingLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAddingLoading ? <i className="fas fa-spinner fa-spin" /> : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold text-green-500 mb-6">Related Products</h2>
        {isRelatedLoading ? (
          <ProductsSkelton/>
        ) : relatedProducts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {relatedProducts.map((item) => (
              <Card key={item._id} product={item} />
            ))}
          </div>
        ) : relatedProducts?.length === 0 &&(
          <p className="text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
