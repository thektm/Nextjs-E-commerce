"use client";
import React from "react";
import { useEffect, useState } from "react";

const LearnMore = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  });
  const calculate = () => {
    if (width < 750) {
      return 6380;
    } else if (width > 350 && width < 1020) {
      return 3550;
    } else {
      return 3000;
    }
  };
  return (
    <div
      className="scale-75 md:scale-100"
      onClick={() => {
        scrollTo({ top: calculate(), behavior: "smooth" });
        setTimeout(() => {
          scrollTo({ top: calculate(), behavior: "smooth" });
        }, 1000);
      }}
    >
      <button className="learn-morex buttong">
        <span className="circlex" aria-hidden="true">
          <span className="iconx arrowx" />
        </span>
        <span className="button-textx">Learn More</span>
      </button>
    </div>
  );
};

export default LearnMore;
