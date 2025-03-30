"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BadgeInfo,
  Ruler,
  Plus,
  ShoppingBag,
  Minus,
  Delete,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
interface DetailModalProps {
  selected: {
    title: string;
    id: number;
    price: number;
    description: string;
    imageurl: string;
    sizes: string;
  } | null;
  disable: () => void;
}
const DetailModal: React.FC<DetailModalProps> = ({ selected, disable }) => {
  if (selected == null || selected == undefined) {
    console.log("selected is null or undefined");
    return null;
  }
  interface CurrentItem {
    id: string | number;
    quantity: number;
    sizes: string;
    price: number;
    // Add other item properties as needed (price, name, etc.)
  }

  const [selectedSize, setSelectedSize] = useState("");
  const [currentItem, setCurrentItem] = useState<CurrentItem[]>([]);
  const { cart, addItem, decreaseItem, resetItem, resetCart } = useCart();

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "XLarge" },
  ];
  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center overflow-hidden bg-black/50"
        onClick={() => {
          disable();
          setCurrentItem([]);
        }}
      >
        <AnimatePresence>
          <motion.div
            layoutId={`card-${selected.id}`}
            
            transition={{ duration: 0.3 }}
            className="rounded-box border-1 relative grid h-fit w-fit max-w-[85%] cursor-default grid-cols-2 overflow-hidden border-gray-400 bg-white shadow-md shadow-gray-700"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              onClick={() => {
                setCurrentItem([]);
                disable();
              }}
              className="rounded-box absolute right-3 top-3 h-fit w-fit font-mono text-sm font-bold text-white transition-all duration-200 hover:scale-110 focus:scale-110"
            >
              <X color="black" width={30} height={30} />
            </div>
            <div className="col-end-2 p-2">
              <motion.img
                onClick={(e) => {
                  e.stopPropagation();
                }}
                src={selected.imageurl}
                className="border-1 h-[100%] max-h-[600px] w-full justify-self-start border-gray-300 object-contain p-2"
              />
            </div>
            <div
              
              className="col-end-3 mt-20 w-full flex-row"
            >
              <h1 className="m-2 mb-20 h-fit border-b-4 p-2 text-center font-sans text-xl">
                {selected.title.toUpperCase()}
              </h1>
              <h1 className="ml-4 text-sm text-black/60">
                <BadgeInfo color="black" size={20} className="mb-0.5 inline" />{" "}
                Description
              </h1>
              <h1 className="ml-2 p-4 text-left font-sans text-lg text-black">
                {selected.description}
              </h1>
              <h1 className="ml-4 text-sm text-black/60">
                <Ruler color="black" size={20} className="mb-0.5 inline" /> Size
              </h1>
              <div className="h-fit bg-white p-4">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-evenly">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      onClick={() => {
                        setSelectedSize(size.value);
                        selected.sizes = size.label;
                        console.log(selected);
                      }}
                      className={`h-fit w-fit items-center justify-self-center rounded-lg border-2 border-black p-2 text-sm font-bold uppercase transition-colors duration-300 ${selectedSize === size.value ? "bg-black text-white" : "bg-white text-black"} `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {size.label}
                      <AnimatePresence>
                        {selectedSize === size.value && (
                          <motion.div
                            className="absolute -right-2 -top-2 rounded-full border-2 border-black bg-white p-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.svg
                              className="h-4 w-4 text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.01 }}
                className={`px-25 lg:px-35 m-2 flex h-fit w-fit justify-center justify-self-center rounded-md bg-black p-2 font-mono text-white transition-all duration-200 items-center${selectedSize !== "" && `shadow-2xs cursor-pointer opacity-100 shadow-white`} cursor-not-allowed uppercase opacity-50`}
                onClick={() => {
                  if (selectedSize !== "") {
                    // Create a new item object with size first
                    const itemToAdd = {
                      ...selected,
                      size: selectedSize,
                      quantity: 1,
                    };

                    // Update cart first
                    addItem(itemToAdd);

                    // Then update current item using the callback form
                    setCurrentItem((prev) => {
                      if (!Array.isArray(prev)) return []; // Ensure prev is always an array

                      const existingItemIndex = prev.findIndex(
                        (item) =>
                          item.id === itemToAdd.id &&
                          item.sizes === itemToAdd.sizes,
                      );

                      if (existingItemIndex !== -1) {
                        return prev.map((item, index) =>
                          index === existingItemIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                        );
                      } else {
                        return [...prev, itemToAdd];
                      }
                    });
                    console.log(currentItem);
                  }
                }}
              >
                <ShoppingBag size={20} className="mx-2 justify-self-start" />
                add
              </motion.div>
              <div className="grid grid-cols-2">
                {currentItem.length >= 1 &&
                  currentItem.map((item : any) => (
                    <div
                      key={item.quantity}
                      className="m-2 inline h-fit w-fit rounded-full bg-black/80 p-2 font-mono uppercase text-white"
                    >
                      <span className="px-1">{item.quantity}</span>
                      <span className="px-1">{item.sizes}</span>
                      <Minus
                        onClick={() => {
                          decreaseItem(item);
                        }}
                        className="mx-1 inline cursor-pointer"
                        size={20}
                      />
                      <X
                        className="mx-1 inline cursor-pointer"
                        size={20}
                        onClick={() => {
                          setCurrentItem([]);
                          resetItem(item);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetailModal;
