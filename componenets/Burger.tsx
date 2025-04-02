"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Burger: React.FC = () => {
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => setWidth(window.innerWidth);
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Toggle body scroll
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigation = (scrollPosition: number) => {
    setIsOpen(false);
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="right-4 top-4 z-50 m-2 text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-7"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 8h22M5 16h22M5 24h22"
          />
        </svg>
      </button>

      {/* Overlay */}
      <motion.div
        style={{ willChange: "opacity" }}
        onClick={() => setIsOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 h-screen w-screen bg-white ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />

      {/* Navigation Menu */}
      <motion.div
        style={{ willChange: "transform" }}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "-5%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="w-78 fixed -right-5 top-0 z-50 h-screen transform bg-white p-4 shadow-lg"
      >
        {/* Close Button */}
        <button
          className="absolute left-4 top-4 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="font-rezvan space-y-4 text-right text-lg">
            <li>
              <button
                onClick={() => handleNavigation(0)}
                className="w-full rounded p-2 text-right hover:bg-gray-200"
              >
                خانه
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation(1425)}
                className="w-full rounded p-2 text-right hover:bg-gray-200"
              >
                محصولات
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation(width > 768 ? 4000 : 6700)}
                className="w-full rounded p-2 text-right hover:bg-gray-200"
              >
                درباره ما
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation(width > 768 ? 9800 : 8850)}
                className="w-full rounded p-2 text-right hover:bg-gray-200"
              >
                تماس با ما
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Burger;
