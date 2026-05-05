import { Link } from "react-router-dom";
import { bestsaller } from "../../Demo Data/ProductCategoryData";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import Heading from "../layout/Heading";
import ProductCard from "../layout/ProductCard";

const BestSaller = () => {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsQuery(
    { status: "bestseller" },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  // Use this
  const products =
    productsData?.data?.length > 0
      ? [...productsData.data].sort(() => Math.random() - 0.5).slice(0, 4)
      : isError || (!isLoading && productsData?.data?.length === 0)
        ? [...bestsaller].sort(() => Math.random() - 0.5).slice(0, 4)
        : [];

  if (isLoading) {
    return <div className="py-20 text-center">Loading Bestsellers...</div>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="pt-16 sm:pt-20 md:pt-28">
      <Container>
        <div className="flex justify-between items-center mb-6 md:mb-10 lg:mb-14">
          <Heading
            tagname="h1"
            text="Our Bestsellers"
            className="font-bold font-dm-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px] capitalize text-[#262626]"
          />
          <Link
            to="/shop"
            className="text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 text-sm md:text-base font-medium border-b border-transparent hover:border-[#262626]"
          >
            View All
          </Link>
        </div>
        <Flex className={"justify-between gap-y-8 flex-wrap"}>
          {products.map((item, index) => {
            const imageSrc =
              item.thumbnail ||
              (item.images && item.images[0]) ||
              item.productImageSrc;
            const productName = item.name || item.productName;
            const productPrice = item.price
              ? typeof item.price === "string" && item.price.startsWith("$")
                ? item.price
                : `$${item.price}`
              : item.productPrice;
            const productColor =
              (item.colors && item.colors[0]) ||
              item.color ||
              item.productColor;

            return (
              <div
                key={item.id || item._id || index}
                className="w-full sm:w-[48%] lg:w-[24%]"
              >
                <Link
                  to={item.slug ? `/product/${item.slug}` : `/product/${index}`}
                >
                  <ProductCard
                    className="w-full cursor-pointer"
                    productImageLink={imageSrc}
                    tag={item.tag || item.badgeText || "Hot"}
                    productName={productName}
                    productPrice={productPrice}
                    productColor={productColor}
                    id={item.id || item._id}
                  />
                </Link>
              </div>
            );
          })}
        </Flex>
      </Container>
    </section>
  );
};

export default BestSaller;
