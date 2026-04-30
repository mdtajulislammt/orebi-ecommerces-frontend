import React from "react";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import { RiShieldCheckLine } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";

const Additionalinfo = () => {
  return (
    <section className="border-b border-[#F0F0F0] py-4 sm:py-6 md:py-8 bg-white">
      <Container>
        <Flex className={"justify-between items-center"}>
          <Flex className={"items-center gap-x-2 sm:gap-x-3 md:gap-x-4 group cursor-default"}>
            <RiShieldCheckLine className="text-lg sm:text-xl md:text-2xl text-[#262626] transition-transform duration-300 group-hover:scale-110" />
            <p className="font-dm-sans text-[12px] sm:text-[14px] md:text-[16px] text-[#6d6d6d] font-medium">
              Two years warranty
            </p>
          </Flex>
          <Flex className={"items-center gap-x-2 sm:gap-x-3 md:gap-x-4 group cursor-default"}>
            <FaTruckFast className="text-lg sm:text-xl md:text-2xl text-[#262626] transition-transform duration-300 group-hover:scale-110" />
            <p className="font-dm-sans text-[12px] sm:text-[14px] md:text-[16px] text-[#6d6d6d] font-medium">
              Free delivery
            </p>
          </Flex>
          <Flex className={"items-center gap-x-2 sm:gap-x-3 md:gap-x-4 group cursor-default"}>
            <PiArrowCounterClockwiseBold className="text-lg sm:text-xl md:text-2xl text-[#262626] transition-transform duration-300 group-hover:rotate-[-45deg]" />
            <p className="font-dm-sans text-[12px] sm:text-[14px] md:text-[16px] text-[#6d6d6d] font-medium">
              30 days return policy
            </p>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export default Additionalinfo;

