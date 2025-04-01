"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import HangingCard from "./HangingCard";
import { useSelection } from "@/context/SelectionCOntext";
import { X } from "lucide-react";
import MainCard from "./MainCard";

const fetchBestSellers = async () => {
  try {
    const response = await axios.get(
      "https://ziirkfihxenixzqmwgwb.supabase.co/rest/v1/Products?select=*",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaXJrZmloeGVuaXh6cW13Z3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg0MTQsImV4cCI6MjA1NzY2NDQxNH0.5wAsSWMWXQxmDtFs6dfxLzdOW8RVUxV9qBPoNNXuRBw",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaXJrZmloeGVuaXh6cW13Z3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg0MTQsImV4cCI6MjA1NzY2NDQxNH0.5wAsSWMWXQxmDtFs6dfxLzdOW8RVUxV9qBPoNNXuRBw",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

const BestSellers: React.FC = () => {
  const [best, setBest] = useState<any[]>([]);
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileContent, setMobileContent] = useState({
    title: "",
    description: "",
    price: 0,
    imageurl: "",
    sizes: "",
    id: 0,
  });
  const [loading, setLoading] = useState(true);
  const { setSelected } = useSelection();
  const [isClosing, setIsClosing] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [autoDirection, setAutoDirection] = useState("forward");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchBestSellers();
        setBest(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!swiperInstance || best.length === 0) return;

    const interval = setInterval(() => {
      const realIndex = swiperInstance.realIndex;
      const totalSlides = best.length;
      const slidesPerView =
        Math.floor(swiperInstance.params.slidesPerView) || 1;

      if (autoDirection === "forward") {
        if (realIndex >= totalSlides - slidesPerView) {
          setAutoDirection("backward");
          swiperInstance.slidePrev();
        } else {
          swiperInstance.slideNext();
        }
      } else {
        if (realIndex <= 0) {
          setAutoDirection("forward");
          swiperInstance.slideNext();
        } else {
          swiperInstance.slidePrev();
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [swiperInstance, autoDirection, best.length]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenMobile(false);
      setIsClosing(false);
    }, 300);
  };
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-title -mt-14 mb-12 text-center text-4xl font-bold text-slate-800 md:text-5xl">
          BESTSELLERS Collection
        </h2>

        {openMobile && (
          <div
            className={`fixed inset-0 z-50 h-full w-full bg-black/50 backdrop-blur-sm ${
              isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
            }`}
          >
            <div
              className={`relative mx-auto h-[100vh] max-w-2xl transform-gpu overflow-auto bg-white shadow-2xl ${
                isClosing ? "animate-modal-out" : "animate-modal-in"
              }`}
            >
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 shadow-lg transition hover:scale-105"
              >
                <X size={24} className="text-slate-700" />
              </button>
              <div className="m-8 flex self-center justify-self-center">
                <MainCard
                  mobileW={768}
                  sizes={mobileContent.sizes}
                  id={mobileContent.id}
                  product={mobileContent}
                  setSelected={() => {}}
                  title={mobileContent.title}
                  description={mobileContent.description}
                  imageUrl={mobileContent.imageurl}
                  price={mobileContent.price}
                />
              </div>
            </div>
          </div>
        )}

        <div className="relative w-full">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-emerald-500" />
            </div>
          ) : best.length > 3 ? (
            <Swiper
              onSwiper={setSwiperInstance}
              spaceBetween={30}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              speed={800}
              modules={[Mousewheel]}
              resistanceRatio={0.5}
              className="w-auto"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  loopAdditionalSlides: Math.ceil(best.length * 0.5),
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                  loopAdditionalSlides: Math.ceil(best.length * 0.5),
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                  
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                  
                },
              }}
              mousewheel={{
                forceToAxis: true,
                invert: false,
                sensitivity: 0.5,
              }}
              loopPreventsSliding={true} // Prevent edge sliding
            
              
              preventInteractionOnTransition={true} // P
              loopAdditionalSlides={14}
            
            >
              {best.map((product) => (
                <SwiperSlide key={product.id} className="!h-auto !w-[320px]">
                  <div className="animate-fade-in h-full">
                    <HangingCard
                      openMobile={() => {
                        setMobileContent(product);
                        setOpenMobile(true);
                      }}
                      setSelected={() => setSelected(product)}
                      title={product.title}
                      product={product}
                      description={product.description}
                      imageUrl={product.imageurl}
                      price={product.price}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {best.map((product) => (
                <HangingCard
                  key={product.id}
                  openMobile={() => {
                    setMobileContent(product);
                    setOpenMobile(true);
                  }}
                  setSelected={() => setSelected(product)}
                  title={product.title}
                  product={product}
                  description={product.description}
                  imageUrl={product.imageurl}
                  price={product.price}
                />
              ))}
            </div>
          )}
        </div>

        <style jsx global>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes backdrop-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes backdrop-out {
            to {
              opacity: 0;
            }
          }

          @keyframes modal-in {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }

          @keyframes modal-out {
            to {
              transform: translateY(100%);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }

          .animate-backdrop-in {
            animation: backdrop-in 0.3s ease-out forwards;
          }

          .animate-backdrop-out {
            animation: backdrop-out 0.3s ease-out forwards;
          }

          .animate-modal-in {
            animation: modal-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-modal-out {
            animation: modal-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .swiper-slide {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .swiper-slide {
              transition: none !important;
            }
            .animate-fade-in,
            .animate-backdrop-in,
            .animate-modal-in {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default BestSellers;
