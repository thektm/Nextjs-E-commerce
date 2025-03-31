import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import LearnMore from "./LearnMore";
const NewHero: React.FC = () => {
  return (
    <div className="z-0 mx-auto h-full w-full overflow-hidden">
      <div className="rela flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="h-full w-full overflow-hidden">
          <motion.img
            src="/HeroLeft.webp"
            alt="hero"
            initial={{ scale: 1.2, width: "100%" }}
            animate={{ scale: 1.5, width: "100%" }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="z-20 h-full w-full -translate-x-5 object-cover"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <motion.img
            src="/HeroRight.webp"
            alt="hero"
            initial={{ scale: 1.3, width: "100%" }}
            animate={{ scale: 1.0, width: "100%" }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="z-20 h-full w-full object-cover"
          />
        </div>
        <h1
          className={`font-rezvan md:mt-30 lg:mt-50 absolute mt-[65%] text-center text-4xl font-bold text-white md:text-5xl lg:text-7xl`}
        >
          بهترین چرم ها را با ما تجربه کنید
          <br />
          بگو چی میخوای ..؟
        </h1>
      </div>

      <div className="-translate-y-93 absolute flex w-full scale-95 justify-between text-4xl">
        <button
          className="buttonx ml-10 text-2xl md:text-4xl lg:text-6xl"
          data-text="Awesome"
          onClick={() => {
            setTimeout(() => {
              scrollTo({ top: 1120, behavior: "smooth" });
            }, 400);
          }}
        >
          <span className="actual-textx text-2xl md:text-4xl lg:text-6xl">
            &nbsp;Men&nbsp;
          </span>
          <span
            aria-hidden="true"
            className="hover-textx text-2xl md:text-4xl lg:text-6xl"
          >
            &nbsp;MEN&nbsp;
          </span>
        </button>
        <button
          className="buttonxw mr-6 text-2xl md:text-4xl lg:text-6xl"
          data-text="Awesome"
          onClick={() => {
            setTimeout(() => {
              scrollTo({ top: 1120, behavior: "smooth" });
            }, 400);
          }}
        >
          <span className="actual-textxw text-2xl md:text-4xl lg:text-6xl">
            &nbsp;WOMen&nbsp;
          </span>
          <span
            aria-hidden="true"
            className="hover-textxw text-2xl md:text-4xl lg:text-6xl"
          >
            &nbsp;WOMEN&nbsp;
          </span>
        </button>
      </div>
      <div className="absolute flex w-full -translate-y-16 md:pl-8">
        <LearnMore />
      </div>
      <div className="absolute w-full -translate-y-36 md:pl-8"></div>
    </div>
  );
};
export default NewHero;
