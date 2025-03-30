"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";
import SignUpModal from "./SignUpModal";
import Image from "next/image";


const PopupWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const { user, logout } = useAuth();
  const popupRef = useRef<HTMLDivElement>(null);
  const logstat = user;
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center" ref={popupRef}>
      
      <LoginModal
        switches={() => {
          setSignUpWindow(!signUpWindow);
          setLoginWindow(!loginWindow);
        }}
        open={loginWindow}
        onOpenChange={() => setLoginWindow(!loginWindow)}
      />
      <SignUpModal
        switches={() => {
          setSignUpWindow(!signUpWindow);
          setLoginWindow(!loginWindow);
        }}
        open={signUpWindow}
        onOpenChange={() => setSignUpWindow(!signUpWindow)}
      />

      <label
        className="flex cursor-pointer items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center md:h-10 md:w-10">
          {/* Example Avatar Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="1em"
            height="1em"
            className="h-5 w-5 md:h-6 md:w-6"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="3.75" r="3.25" />
              <path d="M13.18 13.5a6.49 6.49 0 0 0-12.36 0Z" />
            </g>
          </svg>
        </div>
      </label>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="-right-22 absolute top-full z-10  mr-6 mt-2 w-fit select-none rounded-lg bg-white p-4 shadow-lg lg:-right-8"
          >
            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-lg rounded-2xl border border-gray-300 bg-gray-50 p-8 shadow-2xl dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-full border-4 border-blue-500 p-1">
                    <img
                      src={"/default-avatar.png"}
                      alt="User Avatar"
                      className="h-28 w-28 rounded-full"
                    />
                  </div>
                  <h2 className="mt-4 text-center font-sans text-3xl font-bold uppercase text-gray-800 dark:text-gray-100">
                    {user.full_name}
                  </h2>
                  <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                    {user.address}
                  </p>
                  <p className="mt-1 text-center text-gray-600 dark:text-gray-300">
                    {user.phone_number}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white transition-all duration-200 hover:bg-red-600"
                  >
                    Logout
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLoginWindow(true);
                    setIsOpen(false);
                  }}
                  className="border-1 m-2 mx-2 block w-40 rounded border-gray-500 p-2 text-center text-xl hover:bg-gray-400 focus:bg-gray-400"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setSignUpWindow(true);
                    setIsOpen(false);
                  }}
                  className="border-1 m-2 mx-2 block w-40 rounded border-gray-500 p-2 text-center text-xl hover:bg-gray-400 focus:bg-gray-400"
                >
                  Sign Up
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopupWindow;
