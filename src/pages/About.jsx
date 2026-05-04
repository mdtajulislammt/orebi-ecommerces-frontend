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
    description:
      "Complimentary shipping on all orders over $50, delivered right to your doorstep.",
  },
  {
    icon: <HiOutlineShieldCheck className="text-2xl" />,
    title: "Secure Payments",
    description:
      "Your transactions are protected with 256-bit SSL encryption and trusted gateways.",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight className="text-2xl" />,
    title: "24/7 Support",
    description:
      "Our dedicated team is always here to help — via chat, email, or phone, anytime.",
  },
  {
    icon: <HiOutlineArrowPath className="text-2xl" />,
    title: "Easy Returns",
    description:
      "Not satisfied? Enjoy hassle-free returns within 30 days, no questions asked.",
  },
];

const About = () => {
  const bannerImage = "/about_banner.png";

  const corePillars = [
    {
      title: "Our Vision",
      tagline: "Democratizing Premium Design",
      description:
        "We believe that high-end aesthetics shouldn't be a luxury reserved for the few. Our vision is to bridge the gap between architectural precision and everyday accessibility, creating a world where every individual can curate their space with items that reflect a standard of uncompromising excellence.",
    },
    {
      title: "Our Story",
      tagline: "A Decade of Digital Craft",
      description:
        "What started in 2012 as a digital-first boutique has evolved into a global benchmark for modern ecommerce. Driven by a collective of designers and technologists, we've spent the last decade perfecting the balance between timeless materials and cutting-edge logistics, ensuring that quality reaches every corner of the world.",
    },
    {
      title: "Our Brand",
      tagline: "The Intersection of Form and Function",
      description:
        "Orebi is more than an ecommerce platform; it is a philosophy of intentional living. Every piece in our collection is selected for its ability to serve a purpose without sacrificing its soul. We partner with ethical artisans to bring you sustainable, heritage-grade products that are built to last a lifetime, not just a season.",
    },
  ];

  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      {/* ── Cinematic Hero Banner ── */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full overflow-hidden mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <img
          src={bannerImage}
          alt="About Orebi Hero"
          className="w-full h-full object-cover grayscale-[40%] brightness-50"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <Container>
            <div className="text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center justify-center gap-2 text-white/50 text-[10px] uppercase tracking-[6px] mb-6">
                  <span>Home</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                  <span className="text-white/80">About Us</span>
                </div>
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-[10px] uppercase">
                  About Us
                </h1>
                <div className="h-[1px] w-20 bg-white/20 mx-auto mt-8"></div>
                <p className="text-white/40 text-[10px] md:text-xs mt-10 max-w-lg mx-auto leading-relaxed font-dm-sans uppercase tracking-[3px]">
                  Redefining modern lifestyle through architectural rigor and sustainable soul.
                </p>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        {/* ── Intro Section ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24 lg:mb-48"
        >
          <div className="w-full lg:w-3/5">
            <Heading
              text="Internationally recognized for celebrating the harmony of classic minimalism and modern innovation."
              className="font-dm-sans text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-black leading-[1] text-primary-color tracking-tighter"
            />
          </div>
          <div className="w-full lg:w-2/5">
            <div className="h-[2px] w-20 bg-black mb-8"></div>
            <Paragraph
              text="We operate at the delicate intersection of heritage and progress. Our curation process is rigorous, selecting only items that honor the past while fearlessly embracing the future. We are a global community of tastemakers dedicated to the lasting power of intentional design."
              classname="text-secondary-color text-sm md:text-lg leading-relaxed lg:leading-[1.7] font-medium"
            />
          </div>
        </motion.div>

        {/* ── Narrative Core Pillars (Text Only) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-32 lg:mb-56">
          {corePillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="relative group"
            >
              <div className="absolute -left-4 top-0 w-[1px] h-0 bg-black group-hover:h-full transition-all duration-700 hidden lg:block"></div>
              <span className="text-secondary-color uppercase tracking-[5px] text-[10px] font-black mb-4 block">
                {pillar.title}
              </span>
              <Heading
                text={pillar.tagline}
                className="font-dm-sans font-bold text-2xl md:text-3xl text-primary-color mb-4 tracking-tight leading-tight"
              />
              <Paragraph
                text={pillar.description}
                classname="text-secondary-color text-xs md:text-sm leading-relaxed opacity-80"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Stats Section (Refined) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-black text-white rounded-[3rem] py-20 sm:py-32 px-10 mb-24 lg:mb-48 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
          
          <Flex className="justify-around flex-wrap gap-y-12 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={scaleIn}
                className="text-center w-1/2 lg:w-1/4"
              >
                <h3 className="font-dm-sans text-4xl sm:text-5xl md:text-6xl font-black mb-3 tracking-tighter">
                  {stat.value}
                </h3>
                <div className="h-[1px] w-6 bg-white/20 mx-auto mb-3"></div>
                <p className="font-dm-sans text-white/40 text-[9px] sm:text-[10px] uppercase tracking-[4px] font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </Flex>
        </motion.div>

        {/* ── Why Choose Us (Grid Refined) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 px-2">
            <div>
              <p className="text-secondary-color uppercase tracking-[4px] text-[10px] font-black mb-3">
                The Orebi Ecosystem
              </p>
              <Heading
                text="Engineering Value"
                className="font-dm-sans font-black text-3xl md:text-5xl lg:text-[68px] text-primary-color tracking-tighter leading-[0.9]"
              />
            </div>
            <Paragraph
              text="Our commitment to excellence is woven into every logistical thread."
              classname="text-secondary-color max-w-[240px] text-right hidden md:block italic text-base font-medium opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                className="bg-white border border-gray-100 p-10 md:p-12 rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-500"></div>
                <div className="w-14 h-14 rounded-xl bg-[#F5F5F3] flex items-center justify-center mb-6 text-primary-color group-hover:bg-black group-hover:text-white transition-all duration-700 scale-110">
                  {feature.icon}
                </div>
                <h4 className="font-dm-sans font-black text-lg mb-3 tracking-tight">
                  {feature.title}
                </h4>
                <p className="font-dm-sans text-secondary-color text-xs md:text-sm leading-relaxed font-medium">
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
