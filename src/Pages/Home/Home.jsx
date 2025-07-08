import React from 'react'
import Style from "./Home.module.css"
import DisplayProducts from '../../Components/DisplayProducts/DisplayProducts'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import MainSlider from '../../Components/MainSlider/MainSlider'
const Home = () => {
  return (
    <div className='animate-fade-in'>
      <MainSlider/>
      <CategoriesSlider/>
      <DisplayProducts/>
    </div>
  )
}

export default Home
