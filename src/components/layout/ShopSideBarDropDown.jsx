import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import Heading from "../layout/Heading";
import Paragraph from "./Paragraph";
import ShopSideBarDropDownItem from "./ShopSideBarDropDownItem";

const ShopSideBarDropDown = ({ dropDownOn, dropDownTitle, data }) => {
  const [dropDwonOpen, setDropDwonOpen] = useState(dropDownOn);
  const [dropDwonItemShow, setDropDwonItemShow] = useState(dropDownOn);

  return (
    <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {dropDwonOpen ? (
        <div
          className="flex justify-between items-center cursor-pointer group/header hover:opacity-80 transition-opacity duration-200"
          onClick={() => setDropDwonItemShow(!dropDwonItemShow)}
        >
          <Heading
            tagname={"h2"}
            text={dropDownTitle}
            className="capitalize font-dm-sans font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-4"
          />
          {dropDwonOpen && (
            <GoTriangleDown
              className={`text-[12px] md:text-[14px] lg:text-[16px] transition duration-[.4s] ${dropDwonItemShow ? "-rotate-180" : "rotate-0"}`}
            />
          )}
        </div>
      ) : (
        <Heading
          tagname={"h2"}
          text={dropDownTitle}
          className="capitalize font-dm-sans font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-4"
        />
      )}

      {dropDwonItemShow &&
        data.map((item) =>
          item.colorname ? (
            <ShopSideBarDropDownItem
              title={[
                <span
                  className={`${item.colorcode} w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 inline-block rounded-full mr-2`}
                ></span>,
                item.colorname,
              ]}
              className="capitalize hover:bg-[#f0f0ee] hover:pl-2 transition-all duration-200 px-1 cursor-pointer font-dm-sans text-secondary-color py-2.5 md:py-4 xl:py-5 border-b border-[#e8e8e8] flex items-center text-[12px] md:text-[14px] lg:text-[16px] rounded-sm"
            />
          ) : (
            <ShopSideBarDropDownItem
              subDropDownOn={item.subcategory ? true : false}
              title={item.name}
              className="capitalize hover:bg-[#f0f0ee] hover:pl-2 transition-all duration-200 text-[12px] md:text-[14px] lg:text-[16px] px-1 cursor-pointer font-dm-sans text-secondary-color py-2 sm:py-3 md:py-4 xl:py-5 border-b border-[#e8e8e8] flex justify-between items-center rounded-sm"
            >
              {item.subcategory &&
                item.subcategory.map((item) => (
                  <Paragraph
                    text={item.name}
                    classname="capitalize font-dm-sans text-secondary-color pl-7 py-2.5 md:py-4 xl:py-5 border-b border-[#e8e8e8] hover:bg-[#f0f0ee] hover:pl-8 transition-all duration-200 px-1 cursor-pointer text-[12px] md:text-[14px] lg:text-[16px] rounded-sm"
                  />
                ))}
            </ShopSideBarDropDownItem>
          )
        )}

      {!dropDwonOpen &&
        data.map((item) =>
          item.colorname ? (
            <ShopSideBarDropDownItem
              title={[
                <span
                  className={`${item.colorcode} w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 inline-block rounded-full mr-2`}
                ></span>,
                item.colorname,
              ]}
              className="capitalize hover:bg-[#f0f0ee] hover:pl-2 transition-all duration-200 px-1 cursor-pointer font-dm-sans text-secondary-color py-2.5 md:py-4 xl:py-5 border-b border-[#e8e8e8] flex items-center text-[12px] md:text-[14px] lg:text-[16px] rounded-sm"
            />
          ) : (
            <ShopSideBarDropDownItem
              subDropDownOn={item.subcategory ? true : false}
              title={item.name}
              className="capitalize hover:bg-[#f0f0ee] hover:pl-2 transition-all duration-200 text-[12px] md:text-[14px] lg:text-[16px] px-1 cursor-pointer font-dm-sans text-secondary-color py-2 sm:py-3 md:py-4 xl:py-5 border-b border-[#e8e8e8] flex justify-between items-center rounded-sm"
            >
              {item.subcategory &&
                item.subcategory.map((item) => (
                  <Paragraph
                    text={item.name}
                    classname="capitalize font-dm-sans text-secondary-color pl-7 py-2.5 md:py-4 xl:py-5 border-b border-[#e8e8e8] hover:bg-[#f0f0ee] hover:pl-8 transition-all duration-200 px-1 cursor-pointer text-[12px] md:text-[14px] lg:text-[16px] rounded-sm"
                  />
                ))}
            </ShopSideBarDropDownItem>
          )
        )}
    </div>
  );
};

export default ShopSideBarDropDown;
