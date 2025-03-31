"use client";
import React, { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";
import SignUpModal from "./SignUpModal";

const PopupWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false); // New state for enter transition
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const { user, logout } = useAuth();
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      // Trigger enter animation after component mounts
      setIsEntering(true);
    } else {
      setIsEntering(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

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

      <button
        className="flex cursor-pointer items-center"
        onClick={() => !isClosing && setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <div className="flex items-center justify-center md:h-10 md:w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
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
      </button>

      {(isOpen || isClosing) && (
        <div
          className={`absolute top-full z-10 -right-12 lg:-right-6 w-fit transform select-none rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ${
            isClosing
              ? "-translate-y-5 opacity-0" // Closing animation
              : isEntering
                ? "translate-y-0 opacity-100" // Opened state
                : "-translate-y-5 opacity-0" // Initial closed state
          }`}
        >
          {user ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-gray-300 bg-gray-50 p-8 shadow-2xl transition-transform duration-200 hover:scale-[1.02]">
              <div className="flex flex-col items-center">
                <div className="rounded-full border-4 border-blue-500 p-1">
                  <img
                    src="/default-avatar.png"
                    alt="User Avatar"
                    className="h-28 w-28 rounded-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-center font-sans text-3xl font-bold uppercase text-gray-800">
                  {user.full_name}
                </h2>
                <p className="mt-2 text-center text-gray-600">{user.address}</p>
                <p className="mt-1 text-center text-gray-600">
                  {user.phone_number}
                </p>
                <button
                  onClick={logout}
                  className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white transition-colors duration-200 hover:bg-red-600 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setLoginWindow(true);
                  handleClose();
                }}
                className="m-2 mx-2 block w-40 rounded border border-gray-500 p-2 text-center text-xl transition-colors duration-200 hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setSignUpWindow(true);
                  handleClose();
                }}
                className="m-2 mx-2 block w-40 rounded border border-gray-500 p-2 text-center text-xl transition-colors duration-200 hover:bg-gray-100"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupWindow;
