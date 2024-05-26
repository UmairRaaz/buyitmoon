'use client'
import React from 'react'
import Hero from './Hero'
import TrendingProducts from './TrendingProducts'
import WhyUs from './WhyUs'
import ProblemsSolutions from './Problem&solution'

const MainPage = () => {
  
  return (
    <div>
      <Hero/>
      {/* <WhyUs/> */}
      {/* <ProblemsSolutions/> */}
      <TrendingProducts/>
    </div>
  )
}

export default MainPage