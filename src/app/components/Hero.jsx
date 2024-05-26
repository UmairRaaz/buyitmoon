import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from 'react-slick';



const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings} className="mt-14 overflow-hidden">
      <div className="h-[60vh] w-full overflow-hidden">
        <Image  src="/bannerOne.jpg" className="h-full w-full " width={500} height={300} alt="Image 1" />
      </div>
      <div className="h-[60vh] w-full">
        <Image src="/bannerTwo.jpg" className="h-full w-full " width={500} height={300} alt="Image 2" />
      </div>
      <div className="h-[60vh] w-full">
        <Image src="/bannerThree.jpg" className="h-full w-full " width={500} height={300} alt="Image 3" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};

export default Hero;
