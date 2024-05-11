'use client'
import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import TrendingProducts from './TrendingProducts'
import Categories from './Categories'
import axios from 'axios'
import ProductContext from '@/context/ProductContext'

const MainPage = () => {
  
  return (
    <div>
      <Hero/>
      <TrendingProducts/>
      <Categories/>
    </div>
  )
}

export default MainPage