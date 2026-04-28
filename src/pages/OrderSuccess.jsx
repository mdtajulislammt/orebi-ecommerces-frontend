import React from "react";
import Container from "../components/layout/Container";
import BreadCrump from "../components/layout/BreadCrump";
import Heading from "../components/layout/Heading";
import Paragraph from "../components/layout/Paragraph";
import { Link } from "react-router-dom";
import CusButton from "../components/layout/CusButton";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <section className="py-20 text-center">
      <Container>
        <BreadCrump />
        <div className="flex flex-col items-center justify-center mt-16">
          <FaCheckCircle className="text-8xl text-green-500 mb-8 animate-bounce" />
          <Heading
            text="Order Placed Successfully!"
            className="text-3xl md:text-5xl font-bold font-dm-sans text-primary-color mb-6"
          />
          <Paragraph
            text="Thank you for your purchase. Your order has been received and is being processed. You will receive an email confirmation shortly."
            classname="text-secondary-color text-lg md:text-xl max-w-2xl mx-auto mb-10"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <CusButton text="Continue Shopping" />
            </Link>
            <Link to="/my-account">
              <CusButton text="View My Orders" className="bg-white !text-black border-2 border-black" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderSuccess;
