import React from "react";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import Image from "../layout/Image";
import { Link } from "react-router-dom";
import addOne from "../../assets/new_tech_ad_1.png";
import addTwo from "../../assets/tech_banner_2.png";
import addThree from "../../assets/tech_banner_3.png";

const Addvertise = () => {
  return (
    <section className="pt-10 sm:pt-14 md:pt-20 lg:pt-24 bg-white">
      <Container>
        <Flex className={"justify-between gap-x-4 sm:gap-x-6 md:gap-x-8"}>
          <div className="w-1/2 overflow-hidden group cursor-pointer rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
            <Link to="/shop">
              <Image 
                imageLink={addOne} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </Link>
          </div>
          <Flex className={"w-1/2 flex-col justify-between gap-y-4 sm:gap-y-6 md:gap-y-8"}>
            <div className="h-[48%] overflow-hidden group cursor-pointer rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
              <Link to="/shop">
                <Image 
                  imageLink={addTwo} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            </div>
            <div className="h-[48%] overflow-hidden group cursor-pointer rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
              <Link to="/shop">
                <Image 
                  imageLink={addThree} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            </div>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export default Addvertise;


