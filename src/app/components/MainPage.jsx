'use client'
import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import TrendingProducts from './TrendingProducts'
import Categories from './Categories'
import axios from 'axios'
import ProductContext from '@/context/ProductContext'
import WhyUs from './WhyUs'
import ProblemsSolutions from './Problem&solution'

const MainPage = () => {
  
  return (
    <div>
      <Hero/>
      <WhyUs/>
      <ProblemsSolutions/>
      <TrendingProducts/>
      {/* <Categories/> */}
    </div>
  )
}

export default MainPage