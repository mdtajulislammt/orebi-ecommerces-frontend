import { Link } from "react-router-dom";
import { specialoffer } from "../../Demo Data/ProductCategoryData";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import Heading from "../layout/Heading";
import ProductCard from "../layout/ProductCard";

const SpecialOffer = () => {
  return (
    <section className="pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28">
      <Container>
        <div className="flex justify-between items-center mb-6 md:mb-10 lg:mb-14">
          <Heading
            tagname="h1"
            text="Special Offers"
            className="font-bold font-dm-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px] capitalize text-[#262626]"
          />
          <Link to="/shop" className="text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 text-sm md:text-base font-medium border-b border-transparent hover:border-[#262626]">
            View All
          </Link>
        </div>
        <Flex className={"justify-between gap-y-8 flex-wrap"}>
          {specialoffer.map((item, index) => (
            <div key={index} className="w-full sm:w-[48%] lg:w-[24%]">
              <Link to={`/product/${index}`}>
                <ProductCard
                  className="w-full cursor-pointer"
                  productImageLink={item.productImageSrc}
                  tag={item.badgeText}
                  tagVisibility={item.badge}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productColor={item.productColor}
                />
              </Link>
            </div>
          ))}
        </Flex>
      </Container>
    </section>
  );
};

export default SpecialOffer;

