"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/Client/SupaBase";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { div } from "framer-motion/client";
import { Minus, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Cart: React.FC = () => {
  const { cart, decreaseItem, resetItem, resetCart } = useCart();
  const [openBag, setOpenBag] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const notify = () =>
    toast("Successfully Purchased || خرید با موفقیت انجام شد", {
      onClose: (reason) => {
        if (reason === true) {
          // closed by user
        } else {
          // auto closed
        }
      },
    });
  let ptotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  const purchase = async () => {
    if (user && cart.length > 0) {
      let p = cart.map(
        (item) => `${item.title} size : ${item.sizes} x ${item.quantity}`,
      );
      console.log("Products:", p);
      setLoading(true);
      const { data, error } = await supabase
        .from("purchase")
        .insert([
          {
            customer_id: user.id,
            products: p,
            total: ptotal,
            done: true,
          },
        ])
        .single();

      if (error) {
        console.error("Error inserting:", error);
        setLoading(false);
      } else {
        console.log("Inserted successfully:", data);
        resetCart(); // Make sure resetCart() is defined
        notify();
        setLoading(false);
      }
    } else {
      console.log("User not logged in or cart is empty.");
      setLoading(false);
    }
  };
  useEffect(() => {
    setTotal(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  return (
    <div className="relative m-2 inline-block self-center justify-self-center">
      <AnimatePresence>
        {openBag && (
          <motion.div
            initial={{ x: 750 }}
            animate={{ x: 0 }}
            exit={{ x: 750 }}
            transition={{ duration: 0.5 }}
            // Adjust height to less than full screen to leave room for the buy button
            className="bg-white/98 fixed right-0 top-14 z-50 flex h-[93vh] w-screen flex-col shadow-lg md:w-1/2 md:rounded-lg"
          >
            {/* Header */}
            <div className="font-waste mt-10 self-center border-b-2 border-black p-1 px-4 text-3xl">
              SHOPPING BAG
            </div>
            <X
              width={25}
              height={25}
              color="black"
              className="absolute left-2 top-2 cursor-pointer"
              onClick={() => {
                setOpenBag(false);
              }}
            />
            {/* Scrollable Cart Content */}
            <div className="mt-5 flex-1 overflow-y-auto">
              {cart.length < 1 ? (
                <div className="font-waste mt-4 text-center text-2xl">
                  YOU HAVE NOTHING IN YOUR BAG
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between border-b-2 border-black p-2 px-5"
                  >
                    <div className="flex flex-row">
                      <img
                        src={item.imageurl}
                        alt={item.title}
                        className="h-20 w-20 object-cover"
                      />
                      <div className="flex flex-col justify-center pl-2">
                        <div className="rounded-4xl w-fit border-gray-400 bg-gray-200 p-2 font-sans text-xs">
                          In Cart: {item.quantity}
                        </div>
                        <div className="font-sans text-sm">${item.price}</div>
                        <div className="font-sans text-xl">{item.title}</div>
                      </div>
                    </div>
                    <div className="self-center justify-self-end p-1 px-4">
                      <Minus
                        onClick={() => {
                          decreaseItem(item);
                        }}
                        color="white"
                        className="rounded-4xl m-1 mx-1 inline cursor-pointer border border-gray-200 bg-gray-700 p-2"
                        size={40}
                      />
                      <X
                        className="rounded-4xl m-1 mx-1 inline cursor-pointer border border-gray-200 bg-gray-700 p-2"
                        size={40}
                        color="white"
                        onClick={() => {
                          resetItem(item);
                        }}
                      />
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="rounded-4xl w-fit border-gray-400 bg-gray-200 p-2 font-sans text-sm">
                        Total Price: ${item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Buy Button */}
            <div className="border-t-2 border-black p-4">
              {cart.length > 0 && (
                <div className="flex h-fit w-full justify-between">
                  <p className="font-waste m-2 p-1 text-lg">Total price: </p>
                  <p className="self-center justify-self-end font-sans uppercase text-black">
                    ${ptotal}
                  </p>
                </div>
              )}
              <button
                className={`w-full ${cart.length < 1 && user !== null ? "cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"} frounded bg-black py-2 text-white`}
                disabled={user ? false : true}
                onClick={() => {
                  purchase();
                }}
              >
                {loading === false ? (
                  user ? (
                    "PURCHASE"
                  ) : (
                    "SIGN IN TO PURCHASE"
                  )
                ) : (
                  <svg
                    className="mx-auto h-5 w-5 animate-spin self-center justify-self-center"
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
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative h-6 w-6 cursor-pointer"
        onClick={() => setOpenBag(!openBag)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-full w-full"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16Zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
          />
        </svg>

        {total > 0 && (
          <div className="z-12 absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm">
            {total}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
