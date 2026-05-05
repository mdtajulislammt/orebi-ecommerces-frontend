import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import Heading from "../layout/Heading";
import Paragraph from "../layout/Paragraph";

const AboutHome = () => {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white overflow-hidden">
      <Container>
        <Flex className="flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative aspect-[1/0.8] overflow-hidden rounded-2xl">
              <img
                src="/orebi_tech.png"
                alt="Orebi Technology"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-50 -z-10 rounded-full blur-3xl opacity-50"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8 sm:space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[6px] font-bold text-indigo-600 block">
                The Tech Vanguard
              </span>
              <Heading
                text="Engineering the Future of Digital Lifestyle"
                className="font-dm-sans text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter text-primary-color"
              />
            </div>

            <Paragraph
              text="At Orebi, we don't just sell electronics; we curate the pinnacle of high-performance technology. From precision-engineered PC components to next-generation mobile devices, we provide the tools that empower your digital evolution."
              classname="text-secondary-color text-base md:text-lg leading-relaxed max-w-xl font-medium opacity-80"
            />

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-4 group"
              >
                <span className="w-12 h-[1px] bg-indigo-600 group-hover:w-20 transition-all duration-500"></span>
                <span className="text-xs uppercase tracking-[4px] font-black text-indigo-600 group-hover:tracking-[6px] transition-all duration-500">
                  Our Story
                </span>
              </Link>
            </div>

            {/* Subtle Stats or Info */}
            <div className="grid grid-cols-2 gap-8 pt-8 sm:pt-12 border-t border-gray-100">
              <div>
                <p className="text-2xl font-black tracking-tighter text-gray-900">
                  Est. 2012
                </p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-bold">
                  Inception
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tighter text-indigo-600">
                  50k+
                </p>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-bold">
                  Digital Assets
                </p>
              </div>
            </div>
          </motion.div>
        </Flex>
      </Container>
    </section>
  );
};

export default AboutHome;
