import Container from "../layout/Container";

const Gallery = () => {
  const pcParts = [
    {
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
      title: "Motherboards",
      size: "col-span-1",
    },
    {
      img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
      title: "Graphics Cards",
      size: "col-span-1 sm:col-span-2",
    },
    {
      img: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800",
      title: "RAM Modules",
      size: "col-span-1",
    },
    {
      img: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=800",
      title: "Processors",
      size: "col-span-1 sm:col-span-2",
    },
    {
      img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800",
      title: "Gaming Cases",
      size: "col-span-1",
    },
    {
      img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800",
      title: "Mechanical Keyboards",
      size: "col-span-1",
    },

  ];

  return (
    <section className=" py-10 bg-white">
      <Container>
        {/* <div className="text-center mb-10 md:mb-16">
          <Heading
            tagname="h1"
            text="PC Parts Showcase"
            className="font-bold font-dm-sans text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] text-[#262626] mb-4"
          />
          <p className="text-[#6D6D6D] text-sm sm:text-base max-w-[600px] mx-auto">
            Discover our premium selection of PC components through this visual gallery.
          </p>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px] px-4 sm:px-10 lg:px-24 py-10 lg:py-20">
          {pcParts.map((item, index) => (
            <div
              key={index}
              className={`${item.size} group relative overflow-hidden rounded-2xl bg-[#F8F9FA] shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  Explore Collection
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Gallery;
