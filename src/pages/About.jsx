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
import jonyImg from "../assets/team/jony.jpeg";
import nayeemImg from "../assets/team/nyeem.jpg";
import razaImg from "../assets/team/raza.jpg";
import shantoImg from "../assets/team/santo.jpeg";
import Container from "../components/layout/Container";
import Heading from "../components/layout/Heading";
import Paragraph from "../components/layout/Paragraph";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardHover = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -15,
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Stats data
const stats = [
  { value: "2026", label: "Year of Inception" },
  { value: "100%", label: "Security Accuracy (RBAC)" },
  { value: "380ms", label: "Avg. Response Time" },
  { value: "98%", label: "Performance Score" },
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
      "Complimentary shipping on all orders over ৳50, delivered right to your doorstep.",
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

// Team data
const team = [
  {
    name: "Md. Rakibul Hasan Raza",
    id: "232-0119-028",
    role: "Web Developer (Team Leader)",
    image: razaImg,
  },
  {
    name: "Md. Rahaduzzaman Jony",
    id: "233-0048-028",
    role: "Front-end Developer",
    image: jonyImg,
  },
  {
    name: "Md. Alamgir Hossain Shanto",
    id: "233-0049-028",
    role: "Front-end Developer",
    image: shantoImg,
  },
  {
    name: "Md. Nazmul Hasan Nayeem",
    id: "233-0065-028",
    role: "Front-end Developer",
    image: nayeemImg,
  },
];

const About = () => {
  const bannerImage = "/about_banner.png";

  const corePillars = [
    {
      title: "Our Vision",
      tagline: "Democratizing Premium Technology",
      description:
        "We believe that high-end computing and IT aesthetics shouldn't be a luxury reserved for the few. Our vision is to bridge the gap between architectural precision and everyday accessibility, creating a world where every individual can curate their digital workspace with items that reflect a standard of uncompromising technical excellence.",
    },
    {
      title: "Our Story",
      tagline: "A Benchmark of Digital Craft",
      description:
        "What started as a final-year project at the University of South Asia has evolved into a benchmark for modern e-commerce engineering. Driven by a collective of developers and technologists under the guidance of Sidratul Afrida, we have perfected the balance between robust backend architecture and cutting-edge logistics, ensuring that quality IT products reach every corner of the digital world.",
    },
    {
      title: "Our Brand",
      tagline: "The Intersection of Form and Function",
      description:
        "Orebi is more than an e-commerce platform; it is a philosophy of intentional digital living. Every feature, from our Role-Based Access Control to our Stripe-integrated checkout, is built to serve a purpose without sacrificing performance. We partner with modern tech standards to bring you sustainable, enterprise-grade digital solutions that are built to last a lifetime, not just a season.",
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
                <div className="flex items-center justify-center gap-2 text-white/50 text-sm uppercase tracking-[6px] mb-6">
                  <span>Home</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                  <span className="text-white/80">About Us</span>
                </div>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] uppercase leading-none mb-4">
                  About{" "}
                  <span className="text-white/20 italic font-light">Orebi</span>
                </h1>
                <div className="h-[2px] w-20 bg-white/30 mx-auto mt-6 mb-8"></div>
                <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-dm-sans uppercase tracking-[5px] font-bold">
                  Engineering the Future of Digital Lifestyle.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-20"
                >
                  <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent mx-auto"></div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        {/* ── Modern Mission Section (Split Layout) ── */}
        <section className="py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:w-1/2 sticky top-32"
            >
              <span className="text-primary-color text-sm font-black uppercase tracking-[8px] mb-8 block">
                The Tech Vanguard
              </span>
              <h2 className="font-dm-sans text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[0.95] tracking-tighter text-primary-color mb-8">
                Internationally recognized for{" "}
                <span className="text-secondary-color font-light italic">
                  minimalism
                </span>{" "}
                and innovation.
              </h2>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-[1px] bg-black group-hover:w-24 transition-all duration-700"></div>
                <span className="text-sm font-black uppercase tracking-[4px]">
                  Scroll to Explore
                </span>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:w-1/2 space-y-12"
            >
              <div className="p-8 lg:p-16 bg-[#F5F5F3] rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <Paragraph
                  text="At Orebi, we operate at the delicate intersection of technical heritage and digital progress. Developed as a comprehensive research project by Computer Science students, our curation process is rigorous, selecting only high-performance IT components that honor the foundations of engineering while fearlessly embracing the future."
                  classname="text-primary-color text-xl md:text-2xl lg:text-3xl leading-relaxed font-bold tracking-tight mb-6"
                />
                <Paragraph
                  text="We are a community of developers dedicated to the lasting power of intentional, functional design. Our mission is to bridge the gap between high-end computing and everyday accessibility."
                  classname="text-secondary-color text-lg md:text-xl leading-relaxed opacity-70 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {corePillars.slice(0, 2).map((pillar, i) => (
                  <div key={i} className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[5px] text-primary-color">
                      {pillar.title}
                    </h3>
                    <p className="text-base text-secondary-color leading-relaxed opacity-60">
                      {pillar.description.slice(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Personnel Archives (Team) ── */}
        <section className="py-16 lg:py-24 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-secondary-color text-sm font-black uppercase tracking-[6px] mb-4 block opacity-40">
                Core Development Team
              </span>
              <Heading
                text="The Minds Behind Orebi"
                className="font-dm-sans text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary-color leading-none"
              />
            </div>
            <p className="text-base uppercase tracking-[4px] font-bold text-secondary-color opacity-30 hidden md:block">
              University of South Asia / CS Project
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover="hover"
                initial="initial"
                className="group relative"
              >
                <div className="relative overflow-hidden aspect-[3.5/5] bg-[#E5E5E5] transition-all duration-1000 group-hover:bg-[#1A1A1A]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-110 contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />

                  {/* ID Tag */}
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black/10 backdrop-blur-md border border-white/10 rounded-full z-20">
                    <p className="text-white text-xs font-black tracking-[2px]">
                      {member.id}
                    </p>
                  </div>

                  {/* Hover Info */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white/40 text-xs uppercase tracking-[4px] font-black mb-2">
                      Personnel Archive
                    </span>
                    <h4 className="text-white text-3xl font-black tracking-tighter leading-none mb-6">
                      {member.name.split(" ").slice(-1)}
                    </h4>
                    <div className="h-[1px] w-full bg-white/10 mb-6"></div>
                    <p className="text-white/60 text-sm font-medium leading-relaxed italic">
                      Specialized in {member.role.split(" ")[0]} architectural
                      systems for e-commerce.
                    </p>
                  </div>
                </div>

                <div className="mt-6 px-2">
                  <h4 className="text-base font-black uppercase tracking-[3px] text-primary-color mb-1 transition-all duration-500 group-hover:translate-x-2">
                    {member.name}
                  </h4>
                  <p className="text-sm font-bold text-secondary-color opacity-40 uppercase tracking-[2px]">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── The Engineering Metrics (Stats) ── */}
        <section className="py-16 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1A1A1A] text-white rounded-[4rem] p-12 lg:p-24 relative overflow-hidden"
          >
            {/* Geometric Background Element */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border border-white/5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
                <Heading
                  text="The Engineering Metric"
                  className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter"
                />
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-black uppercase tracking-[4px] text-white/40">
                    Real-time Performance Monitoring
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-[1px] divide-white/5">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={scaleIn}
                    className="px-6 group"
                  >
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-4 transition-all duration-700 group-hover:translate-x-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-black uppercase tracking-[4px] text-white/30 group-hover:text-white/60 transition-colors">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Brand Philosophy (Pillars) ── */}
        <section className="py-16 lg:py-24 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            {corePillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
                className="group"
              >
                <div className="flex items-center gap-6 mb-10">
                  <span className="text-3xl font-light text-secondary-color opacity-20">
                    0{index + 1}
                  </span>
                  <div className="h-[1px] flex-1 bg-black/5 group-hover:bg-black transition-all duration-700"></div>
                </div>
                <h3 className="text-sm font-black uppercase tracking-[6px] text-primary-color mb-6">
                  {pillar.title}
                </h3>
                <Heading
                  text={pillar.tagline}
                  className="text-2xl md:text-3xl font-black tracking-tight mb-6 leading-none"
                />
                <Paragraph
                  text={pillar.description}
                  classname="text-secondary-color text-lg leading-relaxed opacity-60 font-medium"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us (Grid Refined) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 px-2">
            <div>
              <p className="text-secondary-color uppercase tracking-[4px] text-sm font-black mb-3">
                The Orebi Ecosystem
              </p>
              <Heading
                text="Engineering Value"
                className="font-dm-sans font-black text-3xl md:text-4xl lg:text-5xl text-primary-color tracking-tighter leading-[0.9]"
              />
            </div>
            <Paragraph
              text="Our commitment to excellence is woven into every logistical thread."
              classname="text-secondary-color max-w-[280px] text-right hidden md:block italic text-lg font-medium opacity-60"
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
                <h4 className="font-dm-sans font-black text-xl mb-3 tracking-tight">
                  {feature.title}
                </h4>
                <p className="font-dm-sans text-secondary-color text-base md:text-lg leading-relaxed font-medium">
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
