"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ref from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  setSelected: () => void;
  product: object | any;
  onClick?: () => void;
  openMobile: () => void;
}

const HangingCard: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  onClick,
  setSelected,
  openMobile,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (width >= 768) {
      // Desktop-specific logic
      setSelected();
    } else {
      // Mobile-specific logic

      openMobile();
    }
  };
  return (
    <motion.div
      layout
      onClick={onClick}
      className="group relative min-h-[450px] min-w-[210px] overflow-visible rounded-[2px] border-2 border-[#c3c6ce] bg-[#ffffff] p-[1.8rem] transition-all duration-500 ease-out hover:border-[#000000] hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] md:min-w-[240px] lg:min-w-[255px]"
    >
      <img
        src={imageUrl}
        alt="photo"
        onClick={() => {
          handleOpen();
        }}
        draggable={false}
        className="font-waste mx-auto max-h-[250px] min-h-[250px] w-fit cursor-pointer rounded-2xl object-contain"
      />
      <span
        ref={ref}
        className="font-waste absolute mt-2 w-[80%] border-t-2 p-2 text-center text-2xl"
      >
        {title}
      </span>
      <span
        className={
          "rounded-4xl shadow-xs absolute right-5 bottom-52 bg-white px-2 text-sm shadow-gray-600 md:text-lg"
        }
      >{`$ ${price}.00 `}</span>
    </motion.div>
  );
};

export default HangingCard;
