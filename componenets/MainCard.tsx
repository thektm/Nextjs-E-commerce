"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Layout, Minus, Ruler, ShoppingBag, X } from "lucide-react";
// Add window size hook
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
  mobileW: number;
  sizes: string;
  setSelected: () => void;
  product: object | any;
  id: number;
}

const MainCard: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  product,
  mobileW,
  sizes: sizesProp,
  setSelected,
  id,
}) => {
  interface CurrentItem {
    id: string | number;
    quantity: number;
    sizes: string;
    imageurl: string;
    title: string;
    price: number;
    // Add other item properties as needed (price, name, etc.)
  }
  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "XLarge" },
  ];
  const { width } = useWindowSize(); // Get current window width
  const [open, setOpen] = useState(false);
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
  interface CartItem {
    id: string | number;
    quantity: number;
    sizes: string;
    price: number;
    // Add other item properties as needed (price, name, etc.)
  }

  const resetCurrentItem = (item: Omit<CartItem, "quantity">) => {
    setCurrentItem((prev) =>
      prev.filter((itemx: CartItem) => itemx.sizes !== item.sizes),
    );
  };
  const handleOpen = () => {
    if (width >= mobileW) {
      // Desktop-specific logic
      setSelected();
    } else {
      // Mobile-specific logic
      setOpen(!open);
    }
  };

  return (
    <div className="group relative h-fit max-w-[370px] md:max-w-[350px] flex-row items-center justify-center overflow-visible rounded-[2px] border-2 border-[#c3c6ce] bg-[#ffffff] p-[1.8rem] transition-all duration-500 ease-out hover:border-[#070707] hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]">
      <div
        onClick={() => {
          handleOpen();
        }}
      >
        <img
          src={imageUrl}
          alt="photo"
          loading="lazy"
          draggable={false}
          className="mx-auto min-h-[250px] w-fit rounded-2xl object-contain"
        />

        <div className="mt-4 border-t-2 border-gray-700"></div>
        <div className="mt-4 w-full text-center">
          <span className="font-waste text-2xl">{title}</span>
        </div>
        <span
          className={
            "rounded-4xl shadow-xs absolute bottom-32 right-5 bg-white px-2 text-sm shadow-gray-600 md:text-lg"
          }
        >
          {!open ? `$ ${price}.00 ` : ""}
        </span>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mt-2 h-fit max-w-fit flex-row items-center justify-center"
        >
          <div className="flex justify-center text-center">
            <div className="border-t-1 absolute top-0 -translate-y-1 rounded-2xl border-gray-300 bg-gray-100 p-2">
              DESCRIPTONS
            </div>
            <div className="border-1 col-start-2 col-end-5 m-2 self-center justify-self-center rounded-2xl border-gray-300 bg-gray-100 p-4 pt-6 text-center">
              {description}
            </div>
          </div>
          <div className="h-fit bg-white p-4">
            <div className="mb-4 self-center justify-self-center text-center font-mono uppercase">
              <Ruler />
              Size
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-evenly">
              {sizes.map((size) => (
                <motion.button
                  key={size.value}
                  onClick={() => {
                    setSelectedSize(size.value);
                    product.sizes = size.label;
                  }}
                  className={`h-fit w-fit items-center justify-self-center rounded-lg border-2 border-black px-8 py-4 text-sm font-bold uppercase transition-colors duration-300 ${selectedSize === size.value ? "bg-black text-white" : "bg-white text-black"} `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {size.label}

                  {/* Selection indicator */}
                 
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
                  ...product,
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
          <div className="mt-4 space-y-3">
            {currentItem.length >= 1 &&
              currentItem.map((item) => (
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
        </motion.div>
      )}
      <X
        className={`absolute bottom-2 right-2 ${open === true ? "flex" : "hidden"} cursor-pointer`}
        size={20}
        onClick={() => {
          setOpen(false);
          setCurrentItem([]);
        }}
      />
    </div>
  );
};
export default MainCard;
