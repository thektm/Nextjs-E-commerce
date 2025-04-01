import Image from "next/image";
import React from "react";
import LearnMore from "./LearnMore";

// Add this CSS to your global styles or component
const styles = `
@keyframes heroLeftScale {
  from { transform: scale(1.2); }
  to { transform: scale(1.5); }
}

@keyframes heroRightScale {
  from { transform: scale(1.3); }
  to { transform: scale(1); }
}

.hero-left-animation {
  animation: heroLeftScale 10s ease-out forwards;
}

.hero-right-animation {
  animation: heroRightScale 10s ease-out forwards;
}
`;

const NewHero: React.FC = () => {
  return (
    <div className="z-0 mx-auto h-full w-full overflow-hidden">
      <style>{styles}</style>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="h-full w-full overflow-hidden">
          <img
            src="/HeroLeft.webp"
            alt="hero"
            className="hero-left-animation z-20 h-full w-full -translate-x-5 object-cover"
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <img
            src="/HeroRight.webp"
            alt="hero"
            className="hero-right-animation z-20 h-full w-full object-cover"
          />
        </div>
        <h1
          className={`font-rezvan md:mt-45 absolute mt-[75%] text-center text-4xl font-bold text-white md:text-5xl lg:mt-60 lg:text-7xl`}
        >
          بهترین چرم ها را با ما تجربه کنید
          <br />
          بگو چی میخوای ..؟
        </h1>
      </div>

      <div className="md:-translate-y-93 -translate-y-110 absolute flex w-full scale-95 justify-between text-4xl">
        <button
          className="buttonx ml-10 text-4xl md:text-4xl lg:text-6xl"
          data-text="Awesome"
          onClick={() => {
            setTimeout(() => {
              scrollTo({ top: 1460, behavior: "smooth" });
            }, 400);
          }}
        >
          <span className="actual-textx text-4xl md:text-4xl lg:text-6xl">
            &nbsp;Men&nbsp;
          </span>
          <span
            aria-hidden="true"
            className="hover-textx text-4xl md:text-4xl lg:text-6xl"
          >
            &nbsp;MEN&nbsp;
          </span>
        </button>
        <button
          className="buttonxw -mr-2 text-4xl md:text-4xl lg:text-6xl"
          data-text="Awesome"
          onClick={() => {
            setTimeout(() => {
              scrollTo({ top: 1460, behavior: "smooth" });
            }, 400);
          }}
        >
          <span className="actual-textxw text-4xl md:text-4xl lg:text-6xl">
            &nbsp;WOMen&nbsp;
          </span>
          <span
            aria-hidden="true"
            className="hover-textxw text-4xl md:text-4xl lg:text-6xl"
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
