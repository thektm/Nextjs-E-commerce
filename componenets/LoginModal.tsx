"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { on } from "events";
import { toast } from "react-toastify";
interface LoginModalProps {
  open: boolean;
  onOpenChange: () => void;
  switches: () => void;
}

export default function LoginModal({
  open,
  onOpenChange,
  switches,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null as string | null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const notifys = () =>
    toast("Login Successful || ورود با موفقیت انجام شد", {
      onClose: (reason) => {
        if (reason !== undefined) {
          console.log("Toast closed with reason:", reason);
        } else {
          console.log("Toast closed automatically");
        }
      },
    });
  const notifyf = () => toast("Login failed || ورود با خطا مواجه شد");

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      console.log("Login successful!");
      onOpenChange();
      notifys();
    } else {
      setError("Invalid email or password.")
      notifyf();
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange()}>
      <DialogContent
        className="-bottom-170 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => {
          onOpenChange();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`w-[400px] rounded-2xl bg-white p-6 text-black shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Welcome to MyLeather
          </h2>
          <p className="mb-6 text-center text-sm text-gray-500">
            Please Enter your Email and Pasword to Login.
          </p>
          {error && (
            <p className="mb-4 rounded-lg bg-red-500 p-4 font-sans text-white">
              * {error}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border p-3 focus:outline-none dark:border-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleLogin();
                  setError(null);
                }
              }}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border p-3 focus:outline-none dark:border-gray-700"
            />
            <motion.button
              whileHover={
                !isLoading ? { scale: 1.05, transition: { duration: 0.2 } } : {}
              }
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              onClick={() => {
                !isLoading ? handleLogin() : undefined;
                setError(null);
              }}
              className="flex w-full items-center justify-center rounded-md bg-black p-3 text-white shadow-lg transition-colors duration-200 ease-in-out dark:bg-white dark:text-black"
            >
              {isLoading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
              ) : (
                "Login"
              )}
            </motion.button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <div
              onClick={() => {
                switches();
              }}
              className="cursor-pointer text-blue-500"
            >
              Sign up
            </div>
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
