import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../components/layout/Container";
import Heading from "../components/layout/Heading";
import Paragraph from "../components/layout/Paragraph";
import { useSubmitContactMutation } from "../features/api/apiSlice";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Contact = () => {
  const bannerImage = "/contact_banner.png";
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const response = await submitContact(formData).unwrap();
      setStatus({
        type: "success",
        message:
          response.message ||
          "Message sent successfully! We will get back to you soon.",
      });
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      });
    } catch (err) {
      const errorMsg = err.data?.message;
      setStatus({
        type: "error",
        message:
          typeof errorMsg === "string"
            ? errorMsg
            : errorMsg?.message ||
              "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      {/* ── Cinematic Hero Banner ── */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full overflow-hidden mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <img
          src={bannerImage}
          alt="Contact Orebi Hero"
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
                  <span className="text-white/80">Contacts</span>
                </div>
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-[10px] uppercase">
                  Contact Us
                </h1>
                <div className="h-[1px] w-20 bg-white/20 mx-auto mt-8"></div>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* ── Contact Form (Left) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-3/5"
          >
            <div className="mb-12">
              <span className="text-secondary-color uppercase tracking-[5px] text-[10px] font-black mb-4 block">
                Communication
              </span>
              <Heading
                text="Fill up a Form"
                className="font-dm-sans font-black text-3xl md:text-5xl text-primary-color tracking-tighter mb-4"
              />
              <Paragraph
                text="We typically respond within 24 business hours. Please provide as much detail as possible."
                classname="text-secondary-color text-sm"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {status.message && (
                <div
                  className={`p-4 text-xs uppercase tracking-widest font-bold ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-primary-color">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-sm font-dm-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-primary-color">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-sm font-dm-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-primary-color">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-sm font-dm-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-primary-color">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-sm font-dm-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-primary-color">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can we assist you today?"
                  required
                  className="w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-sm font-dm-sans resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className={`bg-black text-white px-12 py-4 text-xs uppercase tracking-[4px] font-black hover:bg-gray-900 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Info & Map (Right) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-2/5 space-y-16"
          >
            {/* Office Info */}
            <div className="space-y-8">
              <div>
                <span className="text-secondary-color uppercase tracking-[5px] text-[10px] font-black mb-4 block">
                  Our Presence
                </span>
                <Heading
                  text="Headquarters"
                  className="font-dm-sans font-black text-2xl md:text-3xl text-primary-color tracking-tight mb-4"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-[#F5F5F3] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black">AD</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black mb-1">
                      Address
                    </h4>
                    <p className="text-secondary-color text-sm leading-relaxed">
                      Level 4, Venture Tower, Gulshan-2, Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-[#F5F5F3] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black">PH</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black mb-1">
                      Phone
                    </h4>
                    <p className="text-secondary-color text-sm leading-relaxed">
                      +880 1234 567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-[#F5F5F3] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black">EM</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black mb-1">
                      Email
                    </h4>
                    <p className="text-secondary-color text-sm leading-relaxed">
                      hello@orebi.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14604.423984605928!2d90.41256247953252!3d23.779244017637385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3640fa237c308!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1708744912062!5m2!1sen!2sbd"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="shadow-2xl"
              ></iframe>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
