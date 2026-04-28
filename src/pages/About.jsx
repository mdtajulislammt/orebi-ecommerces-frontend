import { motion } from "framer-motion";
import {
  HiOutlineArrowPath,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTruck,
} from "react-icons/hi2";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
import Flex from "../components/layout/Flex";
import Heading from "../components/layout/Heading";
import Paragraph from "../components/layout/Paragraph";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Stats data
const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "25K+", label: "Happy Customers" },
  { value: "8K+", label: "Products Delivered" },
  { value: "98%", label: "Satisfaction Rate" },
];

// Core values data
const coreValues = [
  {
    icon: <HiOutlineEye className="text-3xl" />,
    title: "Our Vision",
    description:
      "We envision a world where premium style is accessible to everyone. At Orebi, we are committed to breaking the barriers between high-end fashion and everyday affordability — delivering curated, trend-forward collections that empower you to express your unique identity without compromise.",
  },
  {
    icon: <HiOutlineBookOpen className="text-3xl" />,
    title: "Our Story",
    description:
      "Founded in 2012 by a group of passionate designers and tech enthusiasts, Orebi started as a small online boutique with a bold dream: to redefine the ecommerce experience. From a modest warehouse to a globally recognized brand, our journey has been fueled by innovation, quality craftsmanship, and an unwavering dedication to our customers.",
  },
  {
    icon: <HiOutlineSparkles className="text-3xl" />,
    title: "Our Brand",
    description:
      "Orebi is more than a store — it's a lifestyle. Every product we curate reflects our commitment to timeless design, sustainable materials, and meticulous attention to detail. We partner with artisans and ethical manufacturers worldwide to bring you collections that are as kind to the planet as they are to your wardrobe.",
  },
];

// Features data
const features = [
  {
    icon: <HiOutlineTruck className="text-2xl" />,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50, delivered right to your doorstep.",
  },
  {
    icon: <HiOutlineShieldCheck className="text-2xl" />,
    title: "Secure Payments",
    description: "Your transactions are protected with 256-bit SSL encryption and trusted gateways.",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight className="text-2xl" />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help — via chat, email, or phone, anytime.",
  },
  {
    icon: <HiOutlineArrowPath className="text-2xl" />,
    title: "Easy Returns",
    description: "Not satisfied? Enjoy hassle-free returns within 30 days, no questions asked.",
  },
];

const About = () => {
  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <Container>
        <BreadCrump title={"About"} />

        {/* ── Hero Images ── */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <Flex
            className={
              "justify-between gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-7 xl:gap-x-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
            }
          >
            <div className="w-1/2 overflow-hidden rounded-sm">
              <Image
                imageLink={aboutUsOne}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                altText="Orebi workspace and creative process"
              />
            </div>
            <div className="w-1/2 overflow-hidden rounded-sm">
              <Image
                imageLink={aboutUsTwo}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                altText="Orebi product showcase"
              />
            </div>
          </Flex>
        </motion.div> */}

        {/* ── Tagline ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-16 lg:mb-20 mt-10"
        >
          <Heading
            text="Orebi is one of the world's leading ecommerce brands, internationally recognized for celebrating the essence of classic, modern style."
            className="font-dm-sans text-[20px] sm:text-[23px] md:text-[26px] lg:text-[29px] xl:text-[32px] 2xl:text-[35px] leading-snug"
          />
          <Paragraph
            text="Since 2012, we've been curating premium products that blend timeless design with contemporary trends — making luxury accessible to everyone, everywhere."
            classname="text-secondary-color text-sm sm:text-base md:text-lg mt-4 sm:mt-5 md:mt-6 max-w-2xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* ── Stats Section ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#F5F5F3] rounded-md py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-8 mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <Flex className="justify-around flex-wrap gap-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={scaleIn}
                className="text-center w-1/2 sm:w-auto"
              >
                <h3 className="font-dm-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary-color">
                  {stat.value}
                </h3>
                <p className="font-dm-sans text-secondary-color text-xs sm:text-sm md:text-base mt-1.5 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </Flex>
        </motion.div>

        {/* ── Core Values (Vision, Story, Brand) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-secondary-color uppercase tracking-[3px] text-xs sm:text-sm font-dm-sans mb-2">
              What Drives Us
            </p>
            <Heading
              text="Built on Purpose, Driven by Passion"
              className="font-dm-sans font-bold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] text-primary-color"
            />
          </motion.div>

          <Flex className="justify-between flex-wrap gap-y-8">
            {coreValues.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                className="w-full lg:w-[31%] group"
              >
                <div className="border border-[#E8E8E8] rounded-md p-6 sm:p-7 md:p-8 h-full transition-all duration-500 hover:border-primary-color hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F5F3] flex items-center justify-center text-primary-color mb-5 transition-colors duration-500 group-hover:bg-primary-color group-hover:text-white">
                    {item.icon}
                  </div>
                  <Heading
                    text={item.title}
                    tagname="h3"
                    className="font-dm-sans font-bold text-lg sm:text-xl capitalize mb-3 text-primary-color"
                  />
                  <Paragraph
                    text={item.description}
                    classname="text-secondary-color text-sm sm:text-[15px] leading-relaxed"
                  />
                </div>
              </motion.div>
            ))}
          </Flex>
        </motion.div>

        {/* ── Divider Quote ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-center py-10 sm:py-12 md:py-14 lg:py-16 border-t border-b border-[#E8E8E8] mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <p className="font-dm-sans italic text-lg sm:text-xl md:text-2xl lg:text-[26px] text-primary-color max-w-3xl mx-auto leading-relaxed">
            "We don't just sell products — we craft experiences. Every item in our collection tells a story of quality, care, and a commitment to making your life a little more beautiful."
          </p>
          <p className="font-dm-sans text-secondary-color text-sm sm:text-base mt-4 tracking-wide">
            — The Orebi Team
          </p>
        </motion.div>

        {/* ── Why Choose Us ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-secondary-color uppercase tracking-[3px] text-xs sm:text-sm font-dm-sans mb-2">
              The Orebi Promise
            </p>
            <Heading
              text="Why Thousands Trust Orebi"
              className="font-dm-sans font-bold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] text-primary-color"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                className="bg-[#F5F5F3] rounded-md p-5 sm:p-6 md:p-7 text-center transition-all duration-500 hover:bg-primary-color hover:text-white group cursor-default"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4 text-primary-color transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
                  {feature.icon}
                </div>
                <h4 className="font-dm-sans font-bold text-[15px] sm:text-base mb-2 transition-colors duration-500">
                  {feature.title}
                </h4>
                <p className="font-dm-sans text-secondary-color text-xs sm:text-sm leading-relaxed transition-colors duration-500 group-hover:text-white/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
