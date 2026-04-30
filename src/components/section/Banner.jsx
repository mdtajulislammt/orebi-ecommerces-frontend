import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// image
import { Link } from "react-router-dom";
import tech_banner_1 from "../../assets/tech_banner_1.png";
import tech_banner_2 from "../../assets/tech_banner_2.png";
import tech_banner_3 from "../../assets/tech_banner_3.png";
import Container from "../layout/Container";
import Image from "../layout/Image";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const bannerData = [
    {
      img: tech_banner_1,
      title: "Premium Wireless Audio",
      subtitle: "Experience crystal clear sound with our latest noise-cancelling headphones.",
      btnText: "Shop Headphones",
      link: "/shop"
    },
    {
      img: tech_banner_2,
      title: "Fast Charging Solutions",
      subtitle: "Never run out of juice with our high-capacity power banks and fast chargers.",
      btnText: "Explore Power",
      link: "/shop"
    },
    {
      img: tech_banner_3,
      title: "Flagship Smartphones",
      subtitle: "Discover the next generation of mobile technology and stunning displays.",
      btnText: "View Phones",
      link: "/shop"
    }
  ];

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          left: "9%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "35px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "10px 0",
                fontWeight: "bold"
              }
              : {
                  width: "35px",
                  borderRight: "3px white solid",
                  padding: "10px 0",
                  color: "transparent",
                }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                left: "8%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "22px",
                      color: "#262626",
                      borderRight: "2px #262626 solid",
                      padding: "7px 0",
                      fontSize: "12px",
                    }
                  : {
                      width: "22px",
                      borderRight: "2px white solid",
                      padding: "7px 0",
                      fontSize: "12px",
                      color: "transparent",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
      {
        breakpoint: 640,
        settings: {
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                left: "5%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "20px",
                      color: "#262626",
                      borderRight: "2px #262626 solid",
                      padding: "5px 0",
                      fontSize: "10px",
                    }
                  : {
                      width: "20px",
                      borderRight: "2px white solid",
                      padding: "5px 0",
                      fontSize: "10px",
                      color: "transparent",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-r from-[#F5F7F7] via-white to-[#F5F7F7] overflow-hidden">
      <div className="slider-container">
        <Slider {...settings}>
          {bannerData.map((item, index) => (
            <div key={index} className="outline-none">
              <Container>
                <div className="flex flex-col md:flex-row items-center justify-between py-5 sm:py-10 md:py-15 lg:py-20 gap-y-10 md:gap-y-0 px-14 sm:px-20 md:px-28">
                  <div className="w-full md:w-[70%] order-2 md:order-1 px-4 md:px-0 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#262626] mb-8 md:mb-10 leading-[1.05] animate-fadeIn">
                      {item.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-[#6D6D6D] mb-12 md:mb-16 max-w-[580px] mx-auto md:mx-0 leading-relaxed animate-fadeIn">
                      {item.subtitle}
                    </p>
                    <Link
                      to={item.link}
                      className="bg-[#262626] text-white py-4 px-14 md:py-6 md:px-20 text-sm md:text-base font-bold inline-block hover:bg-black transition-all duration-300 shadow-lg hover:shadow-2xl animate-fadeIn"
                    >
                      {item.btnText}
                    </Link>
                  </div>
                  <div className="w-full md:w-[45%] order-1 md:order-2 flex justify-center items-center">
                    <div className="w-[90%] sm:w-[80%] md:w-full max-w-[700px] animate-fadeIn">
                      <Image
                        className="w-full h-auto drop-shadow-3xl transition-transform duration-700 hover:scale-105 select-none"
                        imageLink={item.img}
                        altText={item.title}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};



export default Banner;


