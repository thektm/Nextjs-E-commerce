"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

interface SignUpModalProps {
  open: boolean;
  onOpenChange: () => void;
  switches: () => void;
}

export default function SignUpModal({
  open,
  onOpenChange,
  switches,
}: SignUpModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    full_name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  // Clear form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        email: "",
        password: "",
        repassword: "",
        address: "",
        phone: "",
        full_name: "",
      });
      setError("");
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const notifySuccess = () =>
    toast.success("Signup Successful!", {
      onClose: () => onOpenChange(),
    });

  const handleSignUp = async () => {
    try {
      // Validation
      const { email, password, repassword, address, phone, full_name } =
        formData;
      if (!email || !password || !address || !phone || !full_name) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== repassword) {
        setError("Passwords don't match.");
        return;
      }

      setIsLoading(true);
      setError("");

      const success = await signup(email, password, address, phone, full_name);

      if (success) {
        notifySuccess();
      } else {
        setError("Invalid information. Please check your details.");
      }
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/50"
          onClick={onOpenChange}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-[400px] rounded-2xl bg-white p-6 text-black shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-center text-2xl font-semibold">
              Welcome to MyLeather
            </h2>
            <p className="mb-6 text-center text-sm text-gray-500">
              Please Enter your Information to Sign Up.
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {[
                {
                  name: "full_name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Name and Family",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Email",
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Password",
                },
                {
                  name: "repassword",
                  label: "Confirm Password",
                  type: "password",
                  placeholder: "Re-Enter Password",
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "tel",
                  placeholder: "09xxx...",
                },
                {
                  name: "address",
                  label: "Address",
                  type: "text",
                  placeholder: "Enter Address",
                },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}

              <motion.button
                whileHover={
                  !isLoading
                    ? { scale: 1.05, transition: { duration: 0.2 } }
                    : {}
                }
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                onClick={handleSignUp}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-md bg-black p-3 text-white shadow-lg transition-colors duration-200 ease-in-out dark:bg-white dark:text-black"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={switches}
                className="text-blue-600 hover:underline focus:outline-none"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
