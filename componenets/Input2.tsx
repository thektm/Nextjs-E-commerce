"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/Client/SupaBase";
import DetailModal from "./DetailModal";
import { AnimatePresence, motion } from "framer-motion";
import { useSelection } from "@/context/SelectionCOntext";

// Custom debounce implementation
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
} 

const Input2: React.FC = () => {
  const { setSelected } = useSelection();
  const [query, setQuery] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleProductClick = (product: any) => {
    setSelected(product);
    setShowResults(false);
    setQuery("");
  };

  // Click outside handler to hide the results container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("Products")
          .select("*")
          .ilike("title", `%${searchTerm}%`);

        if (error) throw error;
        setResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
      setLoading(false);
    }, 2000),
    [],
  );

  // Trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <div>
      <div
        className="relative hidden w-full items-center lg:flex"
        ref={containerRef}
      >
        <form className="w-full">
          <label className="relative flex h-10 w-full items-center px-5">
            {/* Search Icon */}
            <svg
              className="absolute left-5 w-[17px] fill-gray-400 peer-placeholder-shown:fill-gray-400 peer-focus:fill-blue-500"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </svg>

            {/* Search Input */}
            <input
              type="text"
              required
              placeholder=" ... جستجو در فروشگاه "
              value={query}
              onChange={(e) => {
                const newValue = e.target.value;
                setQuery(newValue);
                // Immediately set loading to true if newValue is not empty
                newValue.trim() !== "" ? setLoading(true) : setLoading(false);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="font-rezvan not-focus:text-white peer w-full border-none bg-transparent px-8 text-right placeholder-gray-400 outline-none focus:text-black"
            />

            {/* Fancy Background */}
            <div className="absolute inset-0 z-[-1] rounded-full bg-[#283542] shadow-md transition-all duration-300 peer-hover:bg-transparent peer-focus:border peer-focus:border-blue-500 peer-focus:bg-transparent" />

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white opacity-100"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </label>
        </form>
        <AnimatePresence>
          {/* Results Container */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-full z-50 mt-2 max-h-[400px] w-[50vw] -translate-x-1/2 overflow-y-auto rounded-lg bg-white p-4 shadow-lg"
            >
              {results.length > 0 ? (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-100"
                    role="button"
                    tabIndex={0}
                  >
                    {/* Product Image */}
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={product.imageurl || "/placeholder-product.jpg"}
                        alt={product.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-product.jpg";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-right" dir="rtl">
                      <h3 className="font-medium text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.price.toLocaleString("fa-IR")} دلار
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-rezvan p-2 text-right text-gray-500">
                  {loading ? (
                    <svg
                      className="h-5 w-5 animate-spin justify-self-center"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : // When not loading, display an appropriate message:
                  query.trim() !== "" ? (
                    "محصولی یافت نشد"
                  ) : (
                    "نام محصول مورد نظر را بنویسید"
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Input2;
