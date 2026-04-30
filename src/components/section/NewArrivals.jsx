import React, { useRef } from "react";
import Container from "../layout/Container";
import Heading from "../layout/Heading";
import ProductCard from "../layout/ProductCard";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { newarrivals } from "../../Demo Data/ProductCategoryData";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16 sm:pt-20 md:pt-28">
      <Container className={"relative group/newarrivals"}>
        <div className="flex justify-between items-center mb-6 md:mb-10 lg:mb-14">
          <Heading
            tagname="h1"
            text="New Arrivals"
            className="font-bold font-dm-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px] capitalize text-[#262626]"
          />
          <Link to="/shop" className="text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 text-sm md:text-base font-medium border-b border-transparent hover:border-[#262626]">
            View All
          </Link>
        </div>
        <div className="slider-container relative">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {newarrivals.map((item, index) => (
              <div key={index} className="px-2">
                <Link to={`/product/${index}`}>
                  <ProductCard
                    className={"cursor-pointer"}
                    productImageLink={item.productImageSrc}
                    tag={item.badgeText}
                    productName={item.productName}
                    productPrice={item.productPrice}
                    productColor={item.productColor}
                  />
                </Link>
              </div>
            ))}
          </Slider>
          
          <button
            className="absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full left-[-15px] md:left-[-25px] bg-[#979797] hover:bg-[#262626] transition-all duration-300 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/newarrivals:opacity-100"
            onClick={previous}
          >
            <FaChevronLeft className="text-white text-lg md:text-xl" />
          </button>
          <button
            className="absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full right-[-15px] md:right-[-25px] bg-[#979797] hover:bg-[#262626] transition-all duration-300 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/newarrivals:opacity-100"
            onClick={next}
          >
            <FaChevronRight className="text-white text-lg md:text-xl" />
          </button>
        </div>
      </Container>
    </section>
  );
};


export default NewArrivals;

