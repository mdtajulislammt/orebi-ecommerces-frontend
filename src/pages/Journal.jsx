import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeft,
  HiOutlineArrowRight,
  HiOutlineTag,
  HiOutlineUser,
} from "react-icons/hi2";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Blog categories
const categories = [
  "All",
  "Fashion",
  "Lifestyle",
  "Technology",
  "Tips & Tricks",
  "News",
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Accessories Every Modern Wardrobe Needs",
    excerpt:
      "Discover the must-have accessories that can transform any outfit from ordinary to extraordinary. From timeless watches to versatile bags, here's your ultimate guide.",
    author: "Sarah Mitchell",
    date: "April 25, 2026",
    comments: 12,
    category: "Fashion",
    image: "/assets/p6.png",
    featured: true,
  },
  {
    id: 2,
    title: "The Rise of Sustainable Fashion in 2026",
    excerpt:
      "Sustainability isn't just a trend — it's a movement. Learn how eco-conscious brands are reshaping the fashion industry and how you can make a difference with your choices.",
    author: "James Cooper",
    date: "April 20, 2026",
    comments: 8,
    category: "Lifestyle",
    image: "/assets/p7.png",
    featured: false,
  },
  {
    id: 3,
    title: "How Wireless Audio is Changing the Way We Listen",
    excerpt:
      "From noise-cancelling headphones to spatial audio, the wireless revolution is here. Explore the latest innovations in audio technology and find the perfect pair.",
    author: "Alex Chen",
    date: "April 18, 2026",
    comments: 15,
    category: "Technology",
    image: "/assets/p8.png",
    featured: false,
  },
  {
    id: 4,
    title: "5 Tips for Building a Capsule Wardrobe That Works",
    excerpt:
      "A capsule wardrobe saves time, money, and closet space. Here are five practical tips to curate a versatile collection that covers every occasion.",
    author: "Emily Rodriguez",
    date: "April 15, 2026",
    comments: 6,
    category: "Tips & Tricks",
    image: "/assets/p9.png",
    featured: false,
  },
  {
    id: 5,
    title: "Orebi's Spring 2026 Collection Is Here",
    excerpt:
      "Fresh colors, bold silhouettes, and luxurious fabrics define our newest collection. Get a first look at the pieces that will dominate this season.",
    author: "Orebi Team",
    date: "April 12, 2026",
    comments: 22,
    category: "News",
    image: "/assets/p10.png",
    featured: false,
  },
  {
    id: 6,
    title: "The Art of Gifting: Perfect Presents for Every Occasion",
    excerpt:
      "Struggling to find the right gift? Our curated guide covers thoughtful, stylish options for birthdays, anniversaries, holidays, and everything in between.",
    author: "Sarah Mitchell",
    date: "April 8, 2026",
    comments: 9,
    category: "Lifestyle",
    image: "/assets/p6.png",
    featured: false,
  },
];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <Container>
        <BreadCrump title={"Journal"} />

        {/* ── Page Intro ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mt-8 sm:mt-10 md:mt-12 mb-10 sm:mb-14 md:mb-16"
        >
          <p className="text-secondary-color uppercase tracking-[3px] text-xs sm:text-sm font-dm-sans mb-2">
            Our Blog
          </p>
          <Heading
            text="Stories, Insights & Inspiration"
            className="font-dm-sans font-bold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] text-primary-color"
          />
          <Paragraph
            text="Stay updated with the latest trends, tips, and stories from the Orebi community. Your source for style inspiration and product insights."
            classname="text-secondary-color text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto"
          />
        </motion.div>

        {/* ── Featured Post ── */}
        {featuredPost && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
          >
            <div className="flex flex-col lg:flex-row bg-[#F5F5F3] rounded-md overflow-hidden group cursor-pointer">
              <div className="w-full lg:w-1/2 overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="inline-block bg-primary-color text-white text-xs font-dm-sans font-bold uppercase tracking-wider px-3 py-1 rounded-sm w-fit mb-4">
                  Featured
                </span>
                <span className="flex items-center gap-1.5 text-secondary-color text-xs sm:text-sm font-dm-sans mb-3">
                  <HiOutlineTag className="text-sm" />
                  {featuredPost.category}
                </span>
                <h2 className="font-dm-sans font-bold text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-primary-color leading-tight mb-4 group-hover:text-[#444] transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="font-dm-sans text-secondary-color text-sm sm:text-base leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-secondary-color text-xs sm:text-sm font-dm-sans">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineUser className="text-sm" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineCalendarDays className="text-sm" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 font-dm-sans font-bold text-sm text-primary-color group-hover:gap-3 transition-all duration-300">
                    Read More
                    <HiOutlineArrowRight />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Category Filter ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`font-dm-sans text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary-color text-white font-bold"
                    : "bg-[#F5F5F3] text-secondary-color hover:bg-[#E8E8E8] font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Blog Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              custom={index}
              variants={scaleIn}
              className="group cursor-pointer"
            >
              <div className="border border-[#E8E8E8] rounded-md overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#D0D0D0] h-full flex flex-col">
                {/* Post Image */}
                <div className="overflow-hidden h-[200px] sm:h-[220px] md:h-[240px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Post Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-dm-sans text-secondary-color">
                      <HiOutlineTag className="text-xs" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-dm-sans text-secondary-color">
                      <HiOutlineCalendarDays className="text-xs" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-dm-sans font-bold text-base sm:text-lg text-primary-color leading-snug mb-3 group-hover:text-[#444] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-dm-sans text-secondary-color text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
                    <div className="flex items-center gap-3 text-secondary-color text-xs font-dm-sans">
                      <span className="flex items-center gap-1">
                        <HiOutlineUser className="text-xs" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineChatBubbleLeft className="text-xs" />
                        {post.comments}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-dm-sans font-bold text-xs sm:text-sm text-primary-color group-hover:gap-2 transition-all duration-300">
                      Read
                      <HiOutlineArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── No Posts Message ── */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center py-16 sm:py-20"
          >
            <p className="font-dm-sans text-secondary-color text-base sm:text-lg">
              No articles found in this category yet.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 font-dm-sans font-bold text-sm sm:text-base text-primary-color underline underline-offset-4 hover:text-[#444] transition-colors duration-200"
            >
              View all articles
            </button>
          </motion.div>
        )}

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 sm:mt-20 md:mt-24 bg-primary-color rounded-md p-8 sm:p-10 md:p-12 lg:p-14 text-center"
        >
          <p className="text-white/60 uppercase tracking-[3px] text-xs sm:text-sm font-dm-sans mb-2">
            Stay in the loop
          </p>
          <h3 className="font-dm-sans font-bold text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-white mb-3 sm:mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="font-dm-sans text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Get the latest articles, style guides, and exclusive offers
            delivered straight to your inbox. No spam, ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-sm font-dm-sans text-sm sm:text-base outline-none bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:border-white/50 transition-colors duration-200"
            />
            <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-primary-color font-dm-sans font-bold text-sm sm:text-base rounded-sm hover:bg-[#F5F5F3] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Journal;
