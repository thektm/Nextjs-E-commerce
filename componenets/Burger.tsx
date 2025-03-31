"use client";

import { useState, useEffect } from "react";

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
         className="w-7 h-8"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h22M5 16h22M5 24h22"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 h-screen w-screen bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Navigation Menu */}
      <div
        className={`fixed -right-5 top-0 z-50 h-screen w-78 transform bg-white p-4 shadow-lg transition-transform duration-300 ${
          isOpen ? "-translate-x-[5%]" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-2xl"
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
      </div>
    </div>
  );
};

export default Burger;
