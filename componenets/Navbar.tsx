"use client";
import React, { useState, useEffect, use } from "react";
import PopupWindow from "./PopupWindow";
import Burger from "./Burger";
import Input2 from "./Input2";
import Cart from "@/componenets/NewCart";
import { MobileSearch } from "./MobileSearch";
import { useAuth } from "@/context/AuthContext";
interface NavbarProps {
  userLogin?: boolean;
}
export const Navbar: React.FC<NavbarProps> = ({ userLogin }) => {
  
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 750) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-17 fixed z-10 grid w-screen grid-cols-6 grid-rows-1 items-center overflow-visible border-b border-amber-100 bg-gray-50 drop-shadow-xl transition-all">
      {/* Logo */}
      <img
        src="/maral.png"
        alt="logo"
        onClick={() => {
          scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="lg:w-55 md:w-55 w-35 absolute m-1 h-fit transition-all md:static md:ml-4 lg:static lg:ml-10"
      />
      <div
        className={`font-brillant text-md col-start-2 font-bold ${showSearch ? `col-end-4 pr-4` : `col-end-6`} row-end-1 ml-2 hidden h-full w-full translate-x-8 transition-all duration-500 lg:flex`}
      >
        <h1
          className="w-1/3 cursor-pointer self-center transition-all hover:scale-105 focus:scale-110"
          onClick={() => {
            scrollTo({ top: 1220, behavior: "smooth" });
          }}
        >
          Products{" "}
        </h1>
        <h1
          className="w-1/3 cursor-pointer self-center transition-all hover:scale-105 focus:scale-110"
          onClick={() => {
            scrollTo({ top: 3100, behavior: "smooth" });
            setTimeout(() => {
              scrollTo({ top: 3100, behavior: "smooth" });
            }, 1000);
          }}
        >
          Aout Us{" "}
        </h1>
        <h1
          className="w-1/3 cursor-pointer self-center transition-all hover:scale-105 focus:scale-110"
          onClick={() => {
            scrollTo({ top: 4180, behavior: "smooth" });
            setTimeout(() => {
              scrollTo({ top: 4180, behavior: "smooth" });
            }, 1450);
          }}
        >
          Contact Us
        </h1>
      </div>
      <div className="col-start-6 col-end-7 mx-2 flex justify-self-end md:mx-4">
        <MobileSearch />
        <Cart />
        <PopupWindow />
        <Burger />
      </div>
      {/* Search Bar (Appears on Scroll) */}
      <div
        className={`absolute ml-[45%] w-[38%] justify-self-center transition-opacity duration-700 ${
          showSearch ? "translate-y-0 opacity-100" : "-translate-y-25 opacity-0"
        }`}
      >
        <div className="w-[100%]">
          <Input2 />
        </div>
      </div>
    </div>
  );
};
