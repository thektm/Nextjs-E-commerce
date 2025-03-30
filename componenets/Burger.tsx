"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const Burger: React.FC = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* 🍔 Burger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="right-4 top-4 z-50 m-2 rounded-md text-white"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </button>

      {/* 🟡 Overlay (Click outside to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-white opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <motion.div
        initial={{ x: "110%" }}
        animate={{ x: isOpen ? "-5%" : "200%" }}
        exit={{ x: "200%" }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="absolute -right-5 z-50 h-screen w-64 bg-white p-4 shadow-lg"
      >
        {/* ❌ Close Button */}
        <button
          className="absolute right-4 top-4 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* 📜 Navigation Links */}
        <nav className="mt-12">
          <ul className="font-rezvan space-y-4 text-right text-lg">
            <li>
              <div
                className="block rounded p-2 hover:bg-gray-200"
                onClick={async () => {
                  await setIsOpen(false);
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                خانه
              </div>
            </li>
            <li>
              <div
                className="block rounded p-2 hover:bg-gray-200"
                onClick={async () => {
                  await setIsOpen(false);
                  scrollTo({ top: 1125, behavior: "smooth" });
                }}
              >
                محصولات
              </div>
            </li>
            <li>
              <div
                className="block rounded p-2 hover:bg-gray-200"
                onClick={async () => {
                  await setIsOpen(false);
                  scrollTo({
                    top: width > 768 ? 4000 : 6920,
                    behavior: "smooth",
                  });
                  setTimeout(() => {
                    scrollTo({
                      top: width > 768 ? 4000 : 6920,
                      behavior: "smooth",
                    });
                  }, 1000);
                }}
              >
                درباره ما
              </div>
            </li>
            <li>
              <div
                className="block rounded p-2 hover:bg-gray-200"
                onClick={async () => {
                  await setIsOpen(false);
                  scrollTo({
                    top: width > 768 ? 9800 : 8850,
                    behavior: "smooth",
                  });
                  setTimeout(() => {
                    scrollTo({
                      top: width > 768 ? 9800 : 8850,
                      behavior: "smooth",
                    });
                  }, 1500);
                }}
              >
                تماس با ما
              </div>
            </li>
            
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Burger;
