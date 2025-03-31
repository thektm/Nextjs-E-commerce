"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import HangingCard from "./HangingCard";
import MainCard from "./MainCard";
import DetailModal from "./DetailModal";
import { X } from "lucide-react";
import { useSelection } from "@/context/SelectionCOntext";
import BestSellers from "./BestSellers";

const ITEMS_PER_PAGE = 10;

// Fetch products from Supabase
const fetchProducts = async () => {
  const response = await axios.get(
    "https://ziirkfihxenixzqmwgwb.supabase.co/rest/v1/Products?select=*",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaXJrZmloeGVuaXh6cW13Z3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg0MTQsImV4cCI6MjA1NzY2NDQxNH0.5wAsSWMWXQxmDtFs6dfxLzdOW8RVUxV9qBPoNNXuRBw",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaXJrZmloeGVuaXh6cW13Z3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODg0MTQsImV4cCI6MjA1NzY2NDQxNH0.5wAsSWMWXQxmDtFs6dfxLzdOW8RVUxV9qBPoNNXuRBw",
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const Cataloge: React.FC = () => {
  // Animation and Intersection Observer for the slider
  const controlsGal = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  const [isSticky, setIsSticky] = useState(false);
  const newRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { selected, setSelected } = useSelection();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  // Products state & filtering
  const categoryIcons = {
    MEN: "👔",
    WOMEN: "👗",
    SHOES: "👟",
    BAG: "👜",
    ACCESORY: "🧢",
    "ALL PRODUCTS": "🌟",
  } as any;
  const [products, setProducts] = useState<
    {
      id: number;
      title: string;
      price: number;
      description: string;
      imageurl: string;
      sizes: string;
      category?: string; // category is optional
    }[]
  >([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  // Mobile modal state
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileContent, setMobileContent] = useState({
    title: "",
    description: "",
    price: 0,
    imageurl: "",
    sizes: "",
    id: 0,
  });
  // Best sellers state (for the horizontal slider)
  const [best, setBest] = useState<
    {
      id: number;
      title: string;
      price: number;
      description: string;
      imageurl: string;
      category?: string;
    }[]
  >([]);

  const [xValue, setXValue] = useState(0);
  // Mobile dropdown open state
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const categories = ["MEN", "WOMEN", "SHOES", "BAG", "ACCESSORY"];
  const [direction, setDirection] = useState(-1);
  // Fetch all products initially
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setCurrentPage(0);
      })
      .catch((error) => console.error(error));
  }, []);

  // Also set best sellers (for the top slider)
  useEffect(() => {
    fetchProducts()
      .then((data) => setBest(data))
      .catch((error) => console.error(error));
  }, []);

  // Memoize paginated products to avoid recomputation on each render
  const memoizedPaginatedProducts = useMemo(() => {
    const paginateProducts = (items: typeof products, pageSize: number) => {
      const pages = [];
      for (let i = 0; i < items.length; i += pageSize) {
        pages.push(items.slice(i, i + pageSize));
      }
      return pages;
    };
    const filtered = filterCategory
      ? products.filter(
          (p) => p.category?.toUpperCase() === filterCategory.toUpperCase(),
        )
      : products;
    return filtered.length > 0
      ? paginateProducts(filtered, ITEMS_PER_PAGE)
      : [];
  }, [products, filterCategory]);

  // Update pagination state when memoized pagination changes
  useEffect(() => {
    setPaginatedProducts(memoizedPaginatedProducts);
    setTotalPages(memoizedPaginatedProducts.length);
    setCurrentPage(0);
  }, [memoizedPaginatedProducts]);

  // Pagination functions memoized with useCallback
  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  // Smooth scroll when changing pages
  useEffect(() => {
    if (newRef.current && window.scrollY !== 0) {
      const container = newRef.current;
      const scrollPosition = container.offsetTop - 100;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  // Throttled sticky element logic using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!stickyRef.current || !newRef.current) return;
          const bot = newRef.current.getBoundingClientRect();
          if (
            (bot.top < 114 && bot.top > 60) ||
            (bot.bottom > 490 && bot.bottom < 550)
          ) {
            setIsSticky(true);
          } else if (bot.bottom < 480 || (bot.top > 115 && bot.top > 135)) {
            setIsSticky(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion animation for slider direction
  useEffect(() => {
    if (inView) {
      controlsGal.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      });
    }
  }, [inView, controlsGal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "left" ? "right" : "left"));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setXValue(direction === "left" ? 0 : -100);
  }, [direction]);

  // Reset all products (clears filter and re-fetches data)
  const handleReset = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilterCategory(null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Handle category selection (for both desktop and mobile)
  const handleCategoryFilter = useCallback((category: string) => {
    setFilterCategory((prev) => (prev === category ? null : category));
  }, []);

  return (
    <div className="mt-4 h-fit w-full">
      {/* Mobile Detail Modal */}
      <AnimatePresence>
        {openMobile && (
          <motion.div
            layout
            initial={{ opacity: 1, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 h-full w-screen overflow-auto bg-white"
          >
            <X
              className="fixed right-3 top-3 z-50 cursor-pointer"
              onClick={() => setOpenMobile(false)}
              size={30}
              color="black"
            />
            <div className="mt-12 self-center justify-self-center">
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
          </motion.div>
        )}
      </AnimatePresence>
      <BestSellers />
      {/* Banner Section */}
      <div className="w-fit  mx-auto">
        <div className="cardn">
          <div className="loadern font-title justify-self-center text-sm md:text-xl lg:text-3xl">
            <p className="text-center">Always Choose and Wear </p>
            <div className="words">
              <span className="word">Genuine</span>
              <span className="word">Leather</span>
              <span className="word">Genuine</span>
              <span className="word">Leather</span>
              <span className="word">Genuine</span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown Menu - visible only on small devices */}
      {isMobileDropdownOpen && (
        <div
          className="z-8 fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-all duration-300"
          onClick={() => setIsMobileDropdownOpen(false)}
        />
      )}

      <div className="z-9 relative mx-auto mb-4 w-[85%] text-center md:hidden">
        <button
          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/80 p-4 shadow-lg shadow-black/20 transition-all duration-300 hover:bg-black/90 hover:shadow-black/30 active:scale-95"
        >
          <span className="font-medium text-white/95">
            {filterCategory || "Browse Categories"}
          </span>
          <svg
            className={`h-6 w-6 transform text-white transition-all duration-300 ${
              isMobileDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isMobileDropdownOpen && (
          <div className="absolute z-50 mt-2 w-full transform overflow-hidden rounded-2xl border border-white/5 bg-black/90 shadow-2xl shadow-black/30 backdrop-blur-lg transition-all duration-300">
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              <div
                onClick={() => {
                  handleReset();
                  setIsMobileDropdownOpen(false);
                }}
                className="group flex cursor-pointer items-center space-x-3 border-b border-white/5 p-4 transition-all duration-200 hover:bg-white/5"
              >
                <span className="text-lg text-amber-300/80">✦</span>
                <span className="font-medium text-white/95">All Products</span>
              </div>

              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => {
                    handleCategoryFilter(category);
                    setIsMobileDropdownOpen(false);
                  }}
                  className="group flex cursor-pointer items-center space-x-3 border-b border-white/5 p-4 transition-all duration-200 hover:bg-white/5"
                >
                  <span className="text-lg text-amber-300/80">
                    {categoryIcons[category] || "•"}
                  </span>
                  <span className="font-medium text-white/95">{category}</span>
                  <span className="ml-auto transform text-sm text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300/80">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-7">
        {/* Desktop Sticky Category Filter Sidebar */}
        <motion.div
          ref={stickyRef}
          className={`col-start-6 col-end-8 hidden h-fit transition-all duration-300 md:grid ${
            isSticky
              ? "top-22 fixed right-2 z-0 w-[28%] bg-white opacity-100 shadow-lg transition-opacity"
              : ""
          }`}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <div className="mr-4 grid grid-cols-1 gap-2 border-t-4 border-gray-800 py-12">
            {/* ALL PRODUCTS Button */}
            <div
              onClick={handleReset}
              className={`m-2 flex cursor-pointer justify-between space-x-2 border-r-2 p-2 shadow-gray-400 transition-shadow duration-500 hover:rounded-full hover:border-r-0 hover:shadow-md ${
                filterCategory === null
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              <span>ALL PRODUCTS</span>
            </div>
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCategoryFilter(item)}
                className={`m-2 flex cursor-pointer justify-between space-x-2 border-r-2 p-2 shadow-gray-400 transition-shadow duration-500 hover:rounded-full hover:border-r-0 hover:shadow-md ${
                  filterCategory === item
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <span>{item}</span>
                <span className="font-rezvan">
                  {["مردان", "بانوان", "کفش ها", "کیف", "اکسسوری"][index]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="col-start-1 col-end-8 row-start-1 m-6 md:col-end-6">
          <div
            className="relative columns-1 md:columns-2 lg:columns-3"
            ref={newRef}
          >
            {paginatedProducts[currentPage]?.map((product: any) => (
              <motion.div
                key={product.id}
                layoutId={`card-${product.id}`}
                className="break-inside-avoid self-center justify-self-center py-2"
              >
                <MainCard
                  mobileW={768}
                  sizes={product.sizes}
                  id={product.id}
                  product={product}
                  setSelected={() => setSelected(product)}
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageurl}
                  price={product.price}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="col-end-8 h-fit w-full pt-8">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handlePrevPage();
                    newRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  disabled={currentPage === 0}
                  className={`bg-gray-900 p-3 font-sans uppercase text-white shadow-sm shadow-gray-400 ${
                    currentPage === 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    handleNextPage();
                    newRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    });
                  }}
                  disabled={currentPage >= totalPages - 1}
                  className={`bg-gray-900 p-3 font-sans uppercase text-white shadow-sm shadow-gray-400 ${
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailModal selected={selected} disable={() => setSelected(null)} />
    </div>
  );
};

export default Cataloge;
