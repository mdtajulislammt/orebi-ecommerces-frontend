import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import productOne from "../../public/assets/p5.png";
import productTwo from "../../public/assets/p6.png";
import productThree from "../../public/assets/p7.png";
import productFour from "../../public/assets/p8.png";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
import CusButton from "../components/layout/CusButton";
import Flex from "../components/layout/Flex";
import Heading from "../components/layout/Heading";
import InputBox from "../components/layout/InputBox";
import Paragraph from "../components/layout/Paragraph";
import Textarea from "../components/layout/Textarea";
import { color } from "../Demo Data/ProductCategoryData";

const Products = () => {
  const [productsQuantity, setProductsQuantity] = useState(1);
  const [descriptionAndReviewToggle, setDescriptionAndReviewToggle] =
    useState("review");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const productImages = [productOne, productTwo, productThree, productFour];

  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <Container>
        <BreadCrump />

        {/* ===== Product Section: Image Gallery + Info ===== */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          
          {/* ===== Left: Image Gallery ===== */}
          <div className="w-full lg:w-[55%] xl:w-[50%]">
            {/* Main Image */}
            <div className="w-full overflow-hidden rounded-sm bg-[#F5F5F5] mb-3 sm:mb-4">
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer overflow-hidden rounded-sm bg-[#F5F5F5] border-2 transition-all duration-300 ease-in-out ${
                    selectedImage === index
                      ? "border-primary-color shadow-md"
                      : "border-transparent hover:border-[#D8D8D8]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== Right: Product Information ===== */}
          <div className="w-full lg:w-[45%] xl:w-[50%]">
            {/* Product Title */}
            <Heading
              tagname="h2"
              text="Premium Wireless Headphones"
              className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] font-bold font-dm-sans text-primary-color leading-tight"
            />

            {/* Rating & Reviews */}
            <div className="mt-3 sm:mt-4 pb-5 sm:pb-6 ">
              <Flex className={"gap-3 sm:gap-4 items-center"}>
                <Flex className="icons gap-[2px]">
                  <IoIosStar className="text-[#FFD881] text-[18px] sm:text-[20px]" />
                  <IoIosStar className="text-[#FFD881] text-[18px] sm:text-[20px]" />
                  <IoIosStar className="text-[#FFD881] text-[18px] sm:text-[20px]" />
                  <IoIosStar className="text-[#FFD881] text-[18px] sm:text-[20px]" />
                  <IoIosStarHalf className="text-[#FFD881] text-[18px] sm:text-[20px]" />
                </Flex>
                <Paragraph
                  text={"99 Reviews"}
                  classname={
                    "font-dm-sans text-xs sm:text-sm text-secondary-color"
                  }
                />
              </Flex>

              {/* Price */}
              <Flex className={"gap-3 sm:gap-4 items-baseline mt-4 sm:mt-5"}>
                <span className="text-secondary-color line-through text-base sm:text-lg font-dm-sans">
                  $88.00
                </span>
                <span className="font-bold text-xl sm:text-2xl md:text-[28px] font-dm-sans text-primary-color">
                  $44.00
                </span>
                <span className="bg-red-50 text-red-500 text-xs sm:text-sm font-semibold font-dm-sans px-2 py-0.5 rounded">
                  50% OFF
                </span>
              </Flex>
            </div>

            {/* Color Selection */}
            <div className="py-5 sm:py-6 border-b border-[#F0F0F0]">
              <Flex className={"gap-x-8 sm:gap-x-10 items-center"}>
                <Paragraph
                  text={"Color"}
                  classname={
                    "font-bold text-sm sm:text-base uppercase font-dm-sans tracking-wide text-primary-color"
                  }
                />
                <Flex className="color-box gap-x-3 sm:gap-x-4 items-center">
                  {color.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${item.colorcode} rounded-full cursor-pointer transition-all duration-200 ease-in-out relative ${
                        selectedColor === index
                          ? "ring-2 ring-offset-2 ring-primary-color scale-110"
                          : "hover:scale-110"
                      }`}
                      title={item.colorname}
                    ></div>
                  ))}
                </Flex>
              </Flex>
            </div>

            {/* Size Selection */}
            <div className="py-5 sm:py-6 border-b border-[#F0F0F0]">
              <Flex className={"gap-x-8 sm:gap-x-10 items-center"}>
                <Paragraph
                  text={"Size"}
                  classname={
                    "font-bold text-sm sm:text-base uppercase font-dm-sans tracking-wide text-primary-color"
                  }
                />
                <select
                  name="size"
                  id="product-size"
                  className="capitalize w-[120px] sm:w-[150px] text-secondary-color border-2 border-[#F0F0F0] px-4 outline-none py-2 sm:py-2.5 font-dm-sans text-sm sm:text-base rounded-sm focus:border-primary-color transition-colors duration-200 cursor-pointer appearance-none bg-white"
                >
                  <option value="s" defaultValue>
                    S
                  </option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                </select>
              </Flex>
            </div>

            {/* Quantity */}
            <div className="py-5 sm:py-6 border-b border-[#F0F0F0]">
              <Flex className={"gap-x-8 sm:gap-x-10 items-center"}>
                <Paragraph
                  text={"Quantity"}
                  classname={
                    "font-bold text-sm sm:text-base uppercase font-dm-sans tracking-wide text-primary-color"
                  }
                />
                <Flex className="justify-between items-center w-[120px] sm:w-[140px] text-secondary-color border-2 border-[#F0F0F0] rounded-sm overflow-hidden">
                  <button
                    onClick={() =>
                      productsQuantity > 1 &&
                      setProductsQuantity(productsQuantity - 1)
                    }
                    className="px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[#F5F5F5] transition-colors duration-200 text-primary-color"
                  >
                    <FaMinus className="text-[10px] sm:text-xs" />
                  </button>
                  <span className="font-dm-sans text-sm sm:text-base font-semibold text-primary-color select-none">
                    {productsQuantity}
                  </span>
                  <button
                    onClick={() => setProductsQuantity(productsQuantity + 1)}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[#F5F5F5] transition-colors duration-200 text-primary-color"
                  >
                    <FaPlus className="text-[10px] sm:text-xs" />
                  </button>
                </Flex>
              </Flex>
            </div>

            {/* Status */}
            <div className="py-5 sm:py-6 border-b border-[#F0F0F0]">
              <Flex className={"gap-x-8 sm:gap-x-10 items-center"}>
                <Paragraph
                  text={"Status"}
                  classname={
                    "font-bold text-sm sm:text-base uppercase font-dm-sans tracking-wide text-primary-color"
                  }
                />
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-dm-sans text-sm sm:text-base text-green-600 font-medium">
                    In Stock
                  </span>
                </span>
              </Flex>
            </div>

            {/* Action Buttons */}
            <div className="py-6 sm:py-7 border-b border-[#F0F0F0]">
              <Flex className="flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 font-dm-sans font-bold py-3 sm:py-3.5 md:py-4 px-6 bg-primary-color text-white capitalize text-sm sm:text-base hover:bg-[#3a3a3a] transition-all duration-300 ease-in-out rounded-sm">
                  <FiShoppingCart className="text-base sm:text-lg" />
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 font-dm-sans font-bold py-3 sm:py-3.5 md:py-4 px-6 border-2 border-primary-color capitalize text-sm sm:text-base hover:bg-primary-color hover:text-white transition-all duration-300 ease-in-out rounded-sm text-primary-color">
                  <FiHeart className="text-base sm:text-lg" />
                  Add to Wishlist
                </button>
              </Flex>
            </div>

            {/* Accordion: Features & Details */}
            <Accordion
              className="w-full [&>*:last-child]:border-none"
              allowToggle
            >
              <AccordionItem className="bg-white border-b border-[#F0F0F0]">
                <AccordionButton className="flex justify-between py-4 sm:py-5 md:py-6 hover:bg-[#FAFAFA] transition-colors duration-200 px-0">
                  <Heading
                    tagname="h4"
                    text="FEATURES & DETAILS"
                    className="font-dm-sans font-semibold text-sm sm:text-base md:text-lg text-primary-color tracking-wide"
                  />
                  <AccordionIcon className="text-secondary-color" />
                </AccordionButton>
                <AccordionPanel className="px-0">
                  <Paragraph
                    text={
                      "Crafted with premium materials, these wireless headphones deliver crystal-clear audio with deep bass and rich treble. Features include 30-hour battery life, active noise cancellation, and a comfortable over-ear design perfect for long listening sessions."
                    }
                    classname={
                      "font-dm-sans text-secondary-color pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                    }
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="bg-white border-b border-[#F0F0F0]">
                <AccordionButton className="flex justify-between py-4 sm:py-5 md:py-6 hover:bg-[#FAFAFA] transition-colors duration-200 px-0">
                  <Heading
                    tagname="h4"
                    text="SHIPPING & RETURNS"
                    className="font-dm-sans font-semibold text-sm sm:text-base md:text-lg text-primary-color tracking-wide"
                  />
                  <AccordionIcon className="text-secondary-color" />
                </AccordionButton>
                <AccordionPanel className="px-0">
                  <Paragraph
                    text={
                      "Free standard shipping on all orders over $50. Express shipping available for $9.99. Easy 30-day returns — if you're not satisfied, return the product in its original packaging for a full refund."
                    }
                    classname={
                      "font-dm-sans text-secondary-color pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                    }
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* ===== Description & Review Section ===== */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          {/* Tab Buttons */}
          <div className="border-b-2 border-[#F0F0F0]">
            <div className="flex gap-8 sm:gap-12">
              <button
                onClick={() => setDescriptionAndReviewToggle("description")}
                className={`relative pb-3 sm:pb-4 font-dm-sans text-base sm:text-lg font-bold capitalize transition-colors duration-300 ${
                  descriptionAndReviewToggle === "description"
                    ? "text-primary-color"
                    : "text-secondary-color hover:text-primary-color"
                }`}
              >
                Description
                {descriptionAndReviewToggle === "description" && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary-color transition-all duration-300"></span>
                )}
              </button>
              <button
                onClick={() => setDescriptionAndReviewToggle("review")}
                className={`relative pb-3 sm:pb-4 font-dm-sans text-base sm:text-lg font-bold capitalize transition-colors duration-300 ${
                  descriptionAndReviewToggle === "review"
                    ? "text-primary-color"
                    : "text-secondary-color hover:text-primary-color"
                }`}
              >
                Reviews <span className="font-normal">(1)</span>
                {descriptionAndReviewToggle === "review" && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary-color transition-all duration-300"></span>
                )}
              </button>
            </div>
          </div>

          {/* Review Content */}
          {descriptionAndReviewToggle === "review" && (
            <div className="mt-8 sm:mt-10">
              <Paragraph
                text={"1 review for Premium Wireless Headphones"}
                classname={
                  "font-dm-sans text-sm sm:text-base text-secondary-color"
                }
              />

              {/* Review Card */}
              <div className="mt-5 sm:mt-6 border border-[#F0F0F0] rounded-sm p-5 sm:p-6 md:p-8 bg-[#FAFAFA]">
                <Flex
                  className={
                    "flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-5"
                  }
                >
                  <Flex className={"items-center gap-x-4 sm:gap-x-6"}>
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-color flex items-center justify-center text-white font-bold font-dm-sans text-base sm:text-lg">
                      JF
                    </div>
                    <div>
                      <Heading
                        tagname={"h4"}
                        text={"John Ford"}
                        className="capitalize text-base sm:text-lg md:text-[20px] font-bold font-dm-sans text-primary-color"
                      />
                      <Flex className="icons gap-[2px] mt-1">
                        <IoIosStar className="text-[#FFD881] text-[14px] sm:text-[16px]" />
                        <IoIosStar className="text-[#FFD881] text-[14px] sm:text-[16px]" />
                        <IoIosStar className="text-[#FFD881] text-[14px] sm:text-[16px]" />
                        <IoIosStar className="text-[#FFD881] text-[14px] sm:text-[16px]" />
                        <IoIosStarHalf className="text-[#FFD881] text-[14px] sm:text-[16px]" />
                      </Flex>
                    </div>
                  </Flex>
                  <Paragraph
                    text="6 months ago"
                    classname={
                      "text-xs sm:text-sm text-secondary-color font-dm-sans"
                    }
                  />
                </Flex>
                <Paragraph
                  text="Absolutely love these headphones! The sound quality is incredible with deep bass and crystal-clear highs. The noise cancellation works perfectly whether I'm on a flight or in a busy café. Battery life easily lasts through my entire work week. The over-ear design is super comfortable even for extended wear. Highly recommend for anyone looking for premium audio experience."
                  classname={
                    "text-secondary-color text-sm sm:text-base font-dm-sans leading-relaxed"
                  }
                />
              </div>

              {/* Add a Review Form */}
              <div
                id="add-a-review"
                className="mt-10 sm:mt-12 md:mt-14 w-full sm:w-3/4 lg:w-2/4"
              >
                <Heading
                  tagname="h5"
                  text="Add a Review"
                  className="capitalize text-primary-color font-bold text-lg sm:text-xl font-dm-sans mb-8 sm:mb-10"
                />
                <InputBox
                  id={"name"}
                  labelText={"Name"}
                  placeholder={"Your name here"}
                  className={"mb-5 sm:mb-6"}
                />
                <InputBox
                  id={"email"}
                  labelText={"Email"}
                  placeholder={"Your email here"}
                  className={"mb-8 sm:mb-10"}
                />
                <Textarea
                  id={"review"}
                  labelText={"Review"}
                  placeholder={"Your review here"}
                  className={"mb-6 sm:mb-8"}
                />
                <CusButton text="Post Review" />
              </div>
            </div>
          )}

          {/* Description Content */}
          {descriptionAndReviewToggle === "description" && (
            <div className="mt-8 sm:mt-10">
              <Heading
                tagname="h5"
                text="Product Information"
                className="font-bold text-lg sm:text-xl font-dm-sans text-primary-color"
              />
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                <Paragraph
                  text="Experience audio like never before with our Premium Wireless Headphones. Engineered with cutting-edge Bluetooth 5.3 technology, these headphones deliver an uninterrupted, high-fidelity audio experience with an impressive range of up to 15 meters."
                  classname={
                    "text-secondary-color text-sm sm:text-base font-dm-sans leading-relaxed"
                  }
                />
                <Paragraph
                  text="Featuring advanced Active Noise Cancellation (ANC), you can immerse yourself fully in your music, podcasts, or calls without any distractions. The 40mm custom-tuned drivers produce rich, detailed sound with powerful bass and crisp highs, ensuring every note is heard with precision."
                  classname={
                    "text-secondary-color text-sm sm:text-base font-dm-sans leading-relaxed"
                  }
                />
                <Paragraph
                  text="Designed for all-day comfort, the memory foam ear cushions and adjustable headband provide a secure yet gentle fit. With a marathon 30-hour battery life on a single charge, and quick-charge capability giving you 5 hours of playback from just 10 minutes of charging, these headphones are built for your lifestyle."
                  classname={
                    "text-secondary-color text-sm sm:text-base font-dm-sans leading-relaxed"
                  }
                />
              </div>

              {/* Specifications Table */}
              <div className="mt-8 sm:mt-10">
                <Heading
                  tagname="h5"
                  text="Specifications"
                  className="font-bold text-base sm:text-lg font-dm-sans text-primary-color mb-4 sm:mb-5"
                />
                <div className="border border-[#F0F0F0] rounded-sm overflow-hidden">
                  {[
                    { label: "Driver Size", value: "40mm Custom-Tuned" },
                    { label: "Bluetooth", value: "5.3" },
                    { label: "Battery Life", value: "Up to 30 Hours" },
                    { label: "Noise Cancellation", value: "Active (ANC)" },
                    { label: "Weight", value: "250g" },
                    { label: "Charging", value: "USB-C Fast Charge" },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      }`}
                    >
                      <span className="w-2/5 sm:w-1/3 py-3 sm:py-3.5 px-4 sm:px-6 font-dm-sans font-semibold text-sm sm:text-base text-primary-color border-r border-[#F0F0F0]">
                        {spec.label}
                      </span>
                      <span className="w-3/5 sm:w-2/3 py-3 sm:py-3.5 px-4 sm:px-6 font-dm-sans text-sm sm:text-base text-secondary-color">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Products;
