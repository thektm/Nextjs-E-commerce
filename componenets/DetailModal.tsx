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
  const decreaseCurrentItem = (item: Omit<CurrentItem, "quantity">) => {
    setCurrentItem((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.sizes === item.sizes,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prev.map((i) =>
            i.id === item.id && i.sizes === item.sizes
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          );
        }
        // Remove item if quantity would become 0
        return prev.filter(
          (i) => !(i.id === item.id && i.sizes === item.sizes),
        );
      }
      return prev;
    });
  };
  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "XLarge" },
  ];
  const resetCurrentItem = (item: Omit<CurrentItem, "quantity">) => {
    setCurrentItem((prev) =>
      prev.filter((itemx) => itemx.sizes !== item.sizes),
    );
  };
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
            <div className="col-end-3 mt-20 w-full flex-row">
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
              <div className="w-full bg-white p-2">
                <div className="flex flex-between justify-center gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      onClick={() => {
                        setSelectedSize(size.value);
                        selected.sizes = size.label;
                        console.log(selected);
                      }}
                      className={`relative flex h-12 w-20 items-center justify-center rounded-lg border-2 border-gray-800 text-sm font-bold uppercase transition-all duration-300 ${selectedSize === size.value ? "bg-gray-800 text-white shadow-lg" : "bg-white text-gray-800 hover:bg-gray-100"}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {size.label}
                      {selectedSize === size.value && (
                        <motion.div
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.svg
                            className="h-4 w-4 text-white"
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
              <div className="nl-2 max-h-35 mt-2 space-y-3 overflow-auto">
                {currentItem.length >= 1 &&
                  currentItem.map((item: any) => (
                    <div
                      key={`${item.id}-${item.quantity}`}
                      className="flex items-center justify-between rounded-xl bg-white p-4 shadow transition duration-300 hover:shadow-lg dark:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Thumbnail */}
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                          <img
                            src={item.imageurl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {/* Item details */}
                        <div className="flex flex-col">
                          <p className="font-bold text-gray-800 dark:text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-600">
                            Size: {item.sizes}
                          </p>
                        </div>
                      </div>
                      {/* Quantity and action buttons */}
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            decreaseItem(item);
                            decreaseCurrentItem(item);
                          }}
                          className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          <Minus size={20} color="white" />
                        </button>
                        <button
                          onClick={() => {
                            resetItem(item);
                            resetCurrentItem(item);
                          }}
                          className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          <X size={20} color="white" />
                        </button>
                      </div>
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
