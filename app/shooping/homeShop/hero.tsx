"use client";

import React from "react";
import Slider from "react-slick";
import Slide from "./slide";
import img1 from "./banner-1.jpg"
import img2 from"./banner-2.jpg";
import img3 from "./banner-3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const slideData = [
    {
      id: 0,
      img: img1,

    },
    {
      id: 1,
      img: img2,

    },
    {
      id: 2,
      img: img3,

    },
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0 ">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide
              key={item.id}
              img={item.img}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
