import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { Link } from "react-router-dom";

// Layout components
import orebiLogo from "../../assets/logo.png";
import Container from "../layout/Container";
import Heading from "../layout/Heading";
import Image from "../layout/Image";
import List from "../layout/List";
import ListItem from "../layout/ListItem";
import Paragraph from "../layout/Paragraph";

const Footer = () => {
  // Navigation Menu Data
  const menuLinks = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Journal", path: "/journal" },
  ];

  // Social Media Data
  const socialLinks = [
    { icon: <FaFacebookF />, path: "https://facebook.com/orebi" },
    { icon: <FaLinkedinIn />, path: "https://linkedin.com/company/orebi" },
    { icon: <IoLogoInstagram />, path: "https://instagram.com/orebi" },
  ];

  // Reuseable Classes
  const linkItemStyles =
    "font-regular mt-[6px] font-dm text-sm sm:text-base text-[#6D6D6D] hover:text-black hover:font-bold duration-300 transition-all cursor-pointer";
  const sectionTitleStyles =
    "mb-4 font-dm text-sm sm:text-base font-bold uppercase";

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 md:pt-24 md:pb-12 text-[#262626]">
      <Container>
        {/* Upper Footer: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-gray-100">
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <Image
                imageLink={orebiLogo}
                className="w-24 sm:w-32 object-contain"
                alt="Orebi Brand Logo"
              />
            </Link>
            <div className="space-y-4">
              <Paragraph
                classname="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs font-medium"
                text="Crafting the essentials for a modern lifestyle. We blend high-performance technology with timeless minimalist design."
              />
              <div className="flex items-center gap-4 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    href={social.path}
                    key={index}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#262626] hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <span className="text-base">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <Heading
                text="Sitemap"
                className="text-xs font-black uppercase tracking-[0.2em] text-[#262626]"
              />
              <List className="space-y-3">
                {menuLinks.map((item, index) => (
                  <ListItem
                    key={index}
                    className="text-gray-400 hover:text-black text-sm font-bold transition-all duration-300"
                  >
                    <Link to={item.path}>{item.title}</Link>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="space-y-6">
              <Heading
                text="Support"
                className="text-xs font-black uppercase tracking-[0.2em] text-[#262626]"
              />
              <List className="space-y-3">
                <ListItem className="text-gray-400 hover:text-black text-sm font-bold transition-all duration-300">
                  <Link to="/contacts">Help Center</Link>
                </ListItem>
              </List>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-5 lg:pl-12 space-y-8">
            <div className="space-y-4">
              <Heading
                text="Join the Inner Circle"
                className="text-xs font-black uppercase tracking-[0.2em] text-[#262626]"
              />
              <Paragraph
                text="Subscribe to receive updates, access to exclusive deals, and more."
                classname="text-gray-500 text-sm font-medium leading-relaxed max-w-sm"
              />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-lg font-black leading-none">24k+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Customers
                </p>
              </div>
              <div className="w-[1px] h-8 bg-gray-100" />
              <div className="text-center">
                <p className="text-lg font-black leading-none">4.9/5</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Orebi</p>
            <Link to="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">
                Premium Partner
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
