"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/Client/SupaBase";
import { ToastContainer, toast } from "react-toastify";
import { Minus, Recycle, Trash, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Cart: React.FC = () => {
  const { cart, decreaseItem, resetItem, resetCart } = useCart();
  const [openBag, setOpenBag] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const notify = () =>
    toast("Successfully Purchased || خرید با موفقیت انجام شد");

  let ptotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const purchase = async () => {
    if (user && cart.length > 0) {
      setLoading(true);
      const products = cart.map(
        (item) => `${item.title} size : ${item.sizes} x ${item.quantity}`,
      );

      const { error } = await supabase
        .from("purchase")
        .insert([
          { customer_id: user.id, products, total: ptotal, done: true },
        ]);

      if (!error) {
        resetCart();
        notify();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotal(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    if (openBag) {
      requestAnimationFrame(() => setIsMounted(true));
    }
  }, [openBag]);

  const handleClose = () => {
    setIsMounted(false);
    setTimeout(() => setOpenBag(false), 300);
  };

  return (
    <div className="relative m-2 inline-block self-center justify-self-center">
      {/* Cart Overlay */}
      {openBag && (
        <div
          className={`bg-white/98 fixed right-0 top-0 z-50 flex h-screen w-screen transform flex-col shadow-lg transition-transform duration-500 md:w-1/2 md:rounded-lg ${
            isMounted ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="font-waste mt-4 self-center border-b-2 border-black p-1 px-4 text-3xl">
            SHOPPING BAG
          </div>
          <X
            width={25}
            height={25}
            color="black"
            className="absolute left-2 top-2 cursor-pointer"
            onClick={handleClose}
          />

          {/* Scrollable Content */}
          <div className=" flex-1 overflow-y-auto">
            {cart.length < 1 ? (
              <div className="font-waste mt-4 text-center text-2xl">
                YOU HAVE NOTHING IN YOUR BAG
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="animate-fadeIn relative my-4 flex transform flex-col items-center justify-between overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-2xl md:flex-row"
                >
                  <div className="flex w-full flex-row md:w-auto">
                    <img
                      src={item.imageurl}
                      alt={item.title}
                      className="h-45 w-35 rounded-md border border-gray-200 object-contain"
                    />
                    <div className="ml-4 flex h-fit flex-col">
                      <div className="mb-1 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
                        In Cart: {item.quantity}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        Price: ${item.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        Size: {item.sizes}
                      </div>
                    </div>
                    <div className="absolute mt-4  flex w-full -translate-x-10 items-center justify-end self-end md:mt-0">
                      <div className="mt-4 md:mt-0 -translate-y-1">
                        <div className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800">
                          Total: ${item.price * item.quantity}
                        </div>
                      </div>
                      <button
                        onClick={() => decreaseItem(item)}
                        className="mx-1 flex items-center justify-center rounded-full border border-gray-300 bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600"
                      >
                        <Minus size={24} />
                      </button>
                      <button
                        onClick={() => resetItem(item)}
                        className="mx-1 flex items-center justify-center rounded-full border border-gray-300 bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600"
                      >
                        <Trash size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Purchase Section */}
          <div className="mb-10 md:mb-0 border-t-2 border-black p-2 px-4">
            {cart.length > 0 && (
              <div className="relative flex transform items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-md transition duration-300 hover:scale-105">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Price
                  </h3>
                  
                </div>
                <div className="rounded-full bg-gray-800 px-4 py-1">
                  <p className="font-sans text-xl font-bold uppercase text-white">
                    ${ptotal}
                  </p>
                </div>
              </div>
            )}
            <button
              className={`mt-4 w-full rounded-lg py-3 font-bold transition-all duration-300 ${
                cart.length < 1 || !user
                  ? "cursor-not-allowed bg-gray-700 opacity-50"
                  : "bg-indigo-600 hover:scale-105 hover:bg-indigo-700"
              }`}
              disabled={!user}
              onClick={purchase}
            >
              {loading ? (
                <svg
                  className="mx-auto h-6 w-6 animate-spin"
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
              ) : user ? (
                "PURCHASE"
              ) : (
                "SIGN IN TO PURCHASE"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Cart Icon */}
      <div
        className="relative h-6 w-6 cursor-pointer"
        onClick={() => setOpenBag(true)}
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
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;
