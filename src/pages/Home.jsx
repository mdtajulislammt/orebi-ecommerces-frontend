import React from "react";
import Banner from "../components/section/Banner";
import Additionalinfo from "../components/section/Additionalinfo";
import Addvertise from "../components/section/Addvertise";
import NewArrivals from "../components/section/NewArrivals";
import BestSaller from "../components/section/BestSaller";
import Gallery from "../components/section/Gallery";
import SpecialOffer from "../components/section/SpecialOffer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Additionalinfo />
      <Addvertise />
      <NewArrivals/>
      <Gallery />
      <BestSaller />
      <SpecialOffer />
    </div>
  );
};

export default Home;

