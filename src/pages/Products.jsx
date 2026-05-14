import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";
import { FiHeart, FiShoppingCart, FiShare2, FiMessageSquare } from "react-icons/fi";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { MdVerified, MdLocalShipping, MdHistory } from "react-icons/md";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
import CusButton from "../components/layout/CusButton";
import Flex from "../components/layout/Flex";
import Heading from "../components/layout/Heading";
import Paragraph from "../components/layout/Paragraph";
import Textarea from "../components/layout/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../features/orebi/orebiSlice";
import { useGetProductQuery, useGetProductReviewsQuery, useAddReviewMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productsQuantity, setProductsQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const { data: productResponse, isLoading, isError } = useGetProductQuery(id);
  const product = productResponse?.data;
  const { data: reviewsResponse, isLoading: isReviewsLoading } = useGetProductReviewsQuery(product?.id, { skip: !product?.id });
  const [addReview, { isLoading: isSubmittingReview }] = useAddReviewMutation();

  const reviews = reviewsResponse?.data || product?.reviews || [];

  useEffect(() => {
    if (product) {
      if (product.colors?.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-[3px] border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-[3px] border-t-black rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-400 font-bold text-xs tracking-widest uppercase animate-pulse">Loading Details</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-6 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-3">Product Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm text-sm">The item you're looking for might have been moved or is no longer available.</p>
        <button onClick={() => navigate("/shop")} className="bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        productName: product.name,
        productPrice: product.discount_price > 0 ? product.discount_price : product.price,
        productColor: selectedColor || "N/A",
        productSize: selectedSize || "N/A",
        productImageSrc: product.thumbnail,
        quantity: productsQuantity,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: product.id,
        productName: product.name,
        productPrice: product.discount_price > 0 ? product.discount_price : product.price,
        productColor: selectedColor || "N/A",
        productImageSrc: product.thumbnail,
      })
    );
    toast.success(`${product.name} added to wishlist!`);
  };



  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error("Please add a comment");
    if (!product?.id) return toast.error("Product details not fully loaded.");
    
    try {
      await addReview({
        product_id: product.id,
        rating,
        comment
      }).unwrap();
      toast.success("Review posted successfully!");
      setComment("");
      setRating(5);
      setShowReviewForm(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to post review. Please ensure you are logged in.");
    }
  };

  const productImages = [product.thumbnail, ...(product.images || [])];
  const discountPercentage = product.discount_price > 0 
    ? Math.round(((Number(product.price) - Number(product.discount_price)) / Number(product.price)) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<IoIosStar key={i} className="text-[#FFB800]" />);
      else if (i - 0.5 <= rating) stars.push(<IoIosStarHalf key={i} className="text-[#FFB800]" />);
      else stars.push(<IoIosStarOutline key={i} className="text-gray-200" />);
    }
    return stars;
  };

  return (
    <section className="pb-24 pt-8 bg-[#fafafa] font-poppins text-gray-900">
      <Container>
        <div className="mb-8 opacity-80 scale-90 origin-left">
          <BreadCrump />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          
          {/* ===== Left: Image Gallery ===== */}
          <div className="w-full lg:w-[50%] xl:w-[55%] sticky top-24 h-fit">
            <div className="relative group">
              <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-10 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {discountPercentage > 0 && (
                <div className="absolute top-6 left-6 bg-black text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-xl z-10">
                  Save {discountPercentage}%
                </div>
              )}
              
              <button 
                onClick={() => setSelectedImage(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white"
              >
                <FaChevronLeft size={12} />
              </button>
              <button 
                onClick={() => setSelectedImage(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white"
              >
                <FaChevronRight size={12} />
              </button>
            </div>

            <div className="flex gap-3 mt-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 cursor-pointer rounded-2xl bg-white border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-black shadow-md scale-105" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* ===== Right: Product Information ===== */}
          <div className="w-full lg:w-[50%] xl:w-[45%]">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  <span className="hover:text-black cursor-pointer transition-colors">{product.category?.name}</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span className="hover:text-black cursor-pointer transition-colors">{product.brand?.name}</span>
                </div>

                <div className="flex justify-between items-start gap-6">
                  <h1 className="text-2xl md:text-3xl xl:text-4xl font-black text-gray-900 leading-tight font-poppins">
                    {product.name}
                  </h1>
                  <button className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group">
                    <FiShare2 className="text-lg text-gray-400 group-hover:text-black" />
                  </button>
                </div>

                <div className="flex items-center gap-5 mt-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">{renderStars(product.avg_rating || 0)}</div>
                    <span className="ml-1 text-xs font-bold text-gray-400">({reviews.length} Verified Reviews)</span>
                  </div>
                  <div className="h-3 w-[1.5px] bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] uppercase tracking-wider">
                    <MdVerified size={14} />
                    Original Product
                  </div>
                </div>
              </div>

              <div className="bg-white p-7 rounded-[2rem] shadow-xl shadow-gray-200/30 border border-gray-100/50 space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-black tracking-tight">
                    ৳{product.discount_price > 0 ? product.discount_price : product.price}
                  </span>
                  {product.discount_price > 0 && (
                    <span className="text-lg text-gray-300 line-through font-bold">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {product.colors?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Colors</p>
                      <div className="flex flex-wrap gap-2.5">
                        {product.colors.map((colorName, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedColor(colorName)}
                            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                              selectedColor === colorName 
                                ? "bg-black text-white border-black shadow-lg shadow-black/20" 
                                : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
                            }`}
                          >
                            {colorName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.sizes?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Size</p>
                      <div className="flex flex-wrap gap-2.5">
                        {product.sizes.map((size, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs transition-all border-2 ${
                              selectedSize === size 
                                ? "bg-black text-white border-black shadow-lg shadow-black/20" 
                                : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1.5 border border-gray-100 flex-shrink-0">
                      <button
                        onClick={() => productsQuantity > 1 && setProductsQuantity(productsQuantity - 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="w-10 text-center font-black text-sm">{productsQuantity}</span>
                      <button
                        onClick={() => setProductsQuantity(productsQuantity + 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-primary-color text-white rounded-xl font-black flex items-center justify-center gap-2.5 py-3.5 hover:bg-black active:scale-[0.98] transition-all shadow-lg shadow-primary-color/10 text-sm"
                    >
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={handleAddToWishlist}
                      className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                    >
                      <FiHeart size={18} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      handleAddToCart();
                      navigate("/checkout");
                    }}
                    className="w-full bg-black text-white rounded-xl font-black py-4 hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] text-sm"
                  >
                    Quick Purchase
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <MdLocalShipping size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Free Shipping</p>
                    <p className="text-xs font-bold">Standard delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <MdHistory size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Warranty</p>
                    <p className="text-xs font-bold">1 Year Official</p>
                  </div>
                </div>
              </div>

              <Accordion className="space-y-4" allowToggle>
                <AccordionItem className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <AccordionButton className="py-5 px-6 hover:bg-gray-50 transition-all">
                    <span className="flex-1 text-left font-black text-xs uppercase tracking-widest">Product Overview</span>
                    <AccordionIcon size={12} />
                  </AccordionButton>
                  <AccordionPanel className="px-6 pb-6 pt-0 text-gray-500 text-sm leading-relaxed font-medium">
                    {product.description}
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <AccordionButton className="py-5 px-6 hover:bg-gray-50 transition-all">
                    <span className="flex-1 text-left font-black text-xs uppercase tracking-widest">Specifications</span>
                    <AccordionIcon size={12} />
                  </AccordionButton>
                  <AccordionPanel className="px-6 pb-6 pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Availability</span>
                        <span className="font-black text-xs text-green-600">{product.stock} Units</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Condition</span>
                        <span className="font-black text-xs uppercase">{product.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Reference</span>
                        <span className="font-black text-xs text-blue-500 underline cursor-pointer">{product.slug?.slice(0, 8)}</span>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* ===== Reviews Section ===== */}
        <div className="mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-black text-gray-900">What People Are Saying</h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex">{renderStars(product.avg_rating || 0)}</div>
                <p className="text-gray-400 font-bold text-sm tracking-tight">{product.avg_rating || 0} Average Score Based on {reviews.length} Ratings</p>
              </div>
            </div>
            
            {userInfo ? (
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-color transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <FiMessageSquare size={16} />
                {showReviewForm ? "Cancel Review" : "Share Experience"}
              </button>
            ) : (
              <button 
                onClick={() => navigate("/signin")}
                className="bg-white border-2 border-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center gap-3"
              >
                <FiMessageSquare size={16} />
                Login to Rate
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-16 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 animate-[fadeIn_0.4s_ease-out]">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-black mb-2">Write a Review</h3>
                <p className="text-gray-400 text-sm font-medium mb-10">Your feedback helps others make better choices.</p>
                
                <form onSubmit={handleSubmitReview} className="space-y-10 text-left">
                  <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Assign a Rating</p>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setRating(star)}
                          onClick={() => setRating(star)}
                          className={`text-4xl transition-all duration-300 ${star <= rating ? "text-[#FFB800] scale-110 drop-shadow-sm" : "text-gray-200 hover:text-gray-300"}`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Describe Your Experience</p>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Was the quality good? Did it meet your expectations?"
                      className="w-full h-40 p-7 rounded-[2rem] bg-gray-50 border border-transparent focus:border-black focus:bg-white outline-none transition-all font-medium text-gray-700 text-sm resize-none placeholder:text-gray-300"
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="bg-black text-white px-12 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-black/20 text-xs uppercase tracking-widest"
                    >
                      {isSubmittingReview ? "Submitting..." : "Post Review Now"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div key={review.id || index} className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gray-50 border border-gray-100 text-black rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-black group-hover:text-white transition-colors">
                        {review.user?.name?.[0] || review.user_name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-black text-[13px] tracking-tight">{review.user?.name || review.user_name || "Anonymous"}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-md">
                      {new Date(review.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 text-4xl text-gray-50 font-serif opacity-50 select-none">“</span>
                    <p className="text-gray-500 text-[13px] leading-relaxed font-medium line-clamp-4 relative z-10">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white py-24 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-300">
                <FiMessageSquare size={32} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-400 font-medium text-sm max-w-xs">Be the first to share your experience with this product.</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Products;


