import React from 'react'
import Style from "./CategoriesSlider.module.css"
import Slider from 'react-slick'
import useGetApis from '../../Hooks/useGetApis'
const CategoriesSlider = () => {
  let {data} = useGetApis("categories");
  var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024, // < 1024px
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768, // < 768px
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480, // < 480px
      settings: {
        slidesToShow: 2,
      },
    },
  ],

  };

  return (
    <div className='my-6 '>
      <h2 className='text-xl text-green-500 mb-4 font-bold'>Main Popular Categories</h2>
      <Slider className="rounded-lg mb-20  " {...settings}>
        {data?.data.data.map((category, index) => (
          <div key={category.id}>
          <img
            key={index}
            className="w-full h-[250px]  rounded-lg"
            src={category.image}
            alt={category.name}
          />
          <h4 className='text-center text-green-500 font-light mt-2'>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CategoriesSlider
