import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/Client/SupaBase";
import MainCard from "./MainCard";
import { X } from "lucide-react";

function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

export const MobileSearch: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

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
    }, 500),
    [],
  );

  useEffect(() => {
    if (query.trim()) setLoading(true);
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <div className="relative h-7 w-7 cursor-pointer self-center lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={() => setShowSearch(true)}
      >
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex h-screen w-screen cursor-default flex-col items-center bg-white pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-[80%]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو"
                autoFocus
                className="font-rezvan h-12 w-full border-b-2 border-gray-900 bg-white text-right text-black focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute left-2 top-3 h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </div>

            <div className="mt-4 w-[95%] flex-1 overflow-y-auto pb-8">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <svg
                    className="h-8 w-8 animate-spin text-gray-500"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              ) : query === "" ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  نام محصول را بنویسید
                </div>
              ) : results.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  محصولی پیدا نشد
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {results.map((result) => (
                    <MainCard
                      mobileW={1023}
                      key={result.id}
                      sizes={result.sizes}
                      id={result.id}
                      product={result}
                      setSelected={() => {}}
                      title={result.title}
                      description={result.description}
                      imageUrl={result.imageurl}
                      price={result.price}
                    />
                  ))}
                </div>
              )}
            </div>

            <X
              color="black"
              size={25}
              onClick={() => setShowSearch(false)}
              className="absolute left-4 top-4"
            ></X>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
