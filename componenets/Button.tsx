"use client";
import React from "react";
interface ButtonProps {
  children?: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  countainerClass?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  countainerClass,
  className,
  disabled,
  type,
  children,
}) => {
  return (
    <div className={`flex items-center justify-center pt-10`}>
      <div className={countainerClass}>
        <button
          className={className}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          <span>{text}</span>
          {children}
        </button>
      </div>
    </div>
  );
};
export default Button;
