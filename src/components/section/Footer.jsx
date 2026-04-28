import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { Link } from "react-router-dom";

// Layout components
import orebiLogo from "../../../public/assets/logo.png";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
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

  // Realistic Category Data
  const shopLinks = [
    { title: "Electronics", path: "/category/electronics" },
    { title: "Fashion", path: "/category/fashion" },
    { title: "Home Appliances", path: "/category/home-appliances" },
    { title: "Furniture", path: "/category/furniture" },
    { title: "Accessories", path: "/category/accessories" },
  ];

  // Help/Support Data
  const helpLinks = [
    { title: "Privacy Policy", path: "/privacy" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Shipping Policy", path: "/shipping" },
    { title: "Returns & Exchanges", path: "/returns" },
    { title: "Customer Care", path: "/customer-care" },
  ];

  // Social Media Data
  const socialLinks = [
    { icon: <FaFacebookF />, path: "https://facebook.com/orebi" },
    { icon: <FaLinkedinIn />, path: "https://linkedin.com/company/orebi" },
    { icon: <IoLogoInstagram />, path: "https://instagram.com/orebi" },
  ];

  // Reuseable Classes
  const linkItemStyles = "font-regular mt-[6px] font-dm text-sm sm:text-base text-[#6D6D6D] hover:text-black hover:font-bold duration-300 transition-all cursor-pointer";
  const sectionTitleStyles = "mb-4 font-dm text-sm sm:text-base font-bold uppercase";

  return (
    <footer className="mt-7 md:mt-[106px] bg-[#F5F5F3] p-4 md:py-14">
      <Container>
        <Flex className="flex-wrap flex-col-reverse md:flex-row">
          {/* Main Footer Links */}
          <Flex className="menu-part mt-7 sm:mt-8 md:mt-0 flex justify-between flex-wrap w-full md:w-2/4">
            
            {/* MENU SECTION */}
            <div>
              <Heading text="MENU" className={sectionTitleStyles} />
              <List className="capitalize">
                {menuLinks.map((item, index) => (
                  <ListItem key={index} className={linkItemStyles}>
                    <Link to={item.path}>{item.title}</Link>
                  </ListItem>
                ))}
              </List>
            </div>

            {/* SHOP / CATEGORY SECTION */}
            <div>
              <Heading text="SHOP" className={sectionTitleStyles} />
              <List>
                {shopLinks.map((item, index) => (
                  <ListItem key={index} className={linkItemStyles}>
                    <Link to={item.path}>{item.title}</Link>
                  </ListItem>
                ))}
              </List>
            </div>

            {/* HELP SECTION */}
            <div>
              <Heading text="HELP" className={sectionTitleStyles} />
              <List>
                {helpLinks.map((item, index) => (
                  <ListItem key={index} className={linkItemStyles}>
                    <Link to={item.path}>{item.title}</Link>
                  </ListItem>
                ))}
              </List>
            </div>

            {/* CONTACT INFO */}
            <div className="mt-8 sm:mt-0">
              <Heading
                tagname="h3"
                text="(052) 611-5711"
                className="font-dm md:mt-7 xl:mt-0 text-sm sm:text-base font-bold"
              />
              <Heading
                tagname="h3"
                text="support@orebi.com"
                className="mb-0 xl:mb-4 font-dm text-sm sm:text-base font-bold"
              />
              <Paragraph
                text="575 Crescent Ave. Quakertown, PA 18951"
                classname="font-regular mt-[6px] font-dm text-sm sm:text-base text-[#6D6D6D] max-w-[200px]"
              />
            </div>
          </Flex>

          {/* BRAND LOGO SECTION */}
          <div className="w-full md:w-2/4 flex md:justify-center">
            <Link to="/">
              <Image
                imageLink={orebiLogo}
                className="w-[80px] sm:w-[121px] mt-5 md:mt-0 object-contain"
                alt="Orebi Brand Logo"
              />
            </Link>
          </div>
        </Flex>

        {/* FOOTER BOTTOM: SOCIALS & COPYRIGHT */}
        <Flex className="justify-between gap-x-8 sm:gap-x-0 items-center pt-6 sm:pt-7 md:pt-[65px]">
          <Flex className="icons space-x-2.5 sm:space-x-6">
            {socialLinks.map((social, index) => (
              <a 
                href={social.path} 
                key={index} 
                target="_blank" 
                rel="noreferrer"
                className="text-lg sm:text-[20px] text-[#262626] hover:text-[#6D6D6D] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </Flex>
          
          <Paragraph
            text={`© ${new Date().getFullYear()} Orebi Minimal eCommerce. Built by Adveits.`}
            classname="font-regular mt-[6px] font-dm text-[10px] sm:text-base text-[#6D6D6D]"
          />
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;