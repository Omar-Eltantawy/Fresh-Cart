import React from 'react'
import Style from "./MainSlider.module.css"
import Slider from 'react-slick';
import slide1 from "../../assets/images/slider-2.jpeg" 
import slide2 from "../../assets/images/grocery-banner-2.jpeg" 
import mainSlider1 from "../../assets/images/slider-image-1.jpeg" 
import mainSlider2 from "../../assets/images/slider-image-2.jpeg" 
import mainSlider3 from "../../assets/images/slider-image-3.jpeg" 
const MainSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-3/4'>
          <Slider className="rounded-lg  " {...settings}>
            <img
              className="w-full h-[400px] "
              src={mainSlider1}
              alt="Slider Image 1"
            />
            <img
              className="w-full h-[400px] "
              src={mainSlider2}
              alt="Slider Image 2"
            />
            <img
              className="w-full h-[400px] "
              src={mainSlider3}
              alt="Slider Image 3"
            />
          </Slider>
        </div>
        <div className='w-full md:w-1/4'>
          <img className="w-full h-[200px] " src={slide1} alt="Slide 1"/>
          <img className="w-full h-[200px] " src={slide2} alt="Slide 2 "/>  
        </div>

      </div>
      
    </>
  )
}

export default MainSlider
