"use client";
import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <footer className="h-fit grid grid-cols-1 gap-4 bg-gray-900 p-6 text-white md:grid-cols-3 lg:px-12">
      {/* Left Side - Developer Profile */}
      <div className="col-span-1">
        <div className="flex-row">
          <div className="e-card playing relative overflow-hidden">
            {/* Wavy Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="wave absolute -left-10 -top-10 h-[400px] w-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 to-transparent"></div>
              <div
                className="wave absolute -left-10 -top-10 h-[400px] w-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 to-transparent"
                style={{ animationDelay: "-2s" }}
              ></div>
              <div
                className="wave absolute -left-10 -top-10 h-[400px] w-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 to-transparent"
                style={{ animationDelay: "-4s" }}
              ></div>
            </div>
            <a
              href="https://github.com/thektm"
              className="hover:scale-200 mx-auto mt-8 flex w-fit scale-150 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="2em"
                height="2em"
              >
                <path
                  fill="currentColor"
                  d="M8 .198a8 8 0 0 0-2.529 15.591c.4.074.547-.174.547-.385c0-.191-.008-.821-.011-1.489c-2.226.484-2.695-.944-2.695-.944c-.364-.925-.888-1.171-.888-1.171c-.726-.497.055-.486.055-.486c.803.056 1.226.824 1.226.824c.714 1.223 1.872.869 2.328.665c.072-.517.279-.87.508-1.07c-1.777-.202-3.645-.888-3.645-3.954c0-.873.313-1.587.824-2.147c-.083-.202-.357-1.015.077-2.117c0 0 .672-.215 2.201.82A7.7 7.7 0 0 1 8 4.066c.68.003 1.365.092 2.004.269c1.527-1.035 2.198-.82 2.198-.82c.435 1.102.162 1.916.079 2.117c.513.56.823 1.274.823 2.147c0 3.073-1.872 3.749-3.653 3.947c.287.248.543.735.543 1.481c0 1.07-.009 1.932-.009 2.195c0 .213.144.462.55.384A8 8 0 0 0 8.001.196z"
                />
              </svg>
            </a>
            <div className="text-center">
              <br />
              <div className="text-lg font-bold text-purple-400">
                Full-Stack <br /> Development
              </div>
              <div className="p-2 font-sans text-2xl font-bold uppercase text-white">
                Ali Ghorbani
              </div>
            </div>

            {/* Animated Tech Icons */}

            <div className="flex items-center justify-center">
              <svg
                className="scale-120 h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5c.029-.18.077-.37.1-.545c.217-2.058-.273-3.543-1.379-4.182c-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182c.018.175.067.365.095.545c-2.127.819-3.466 2.071-3.466 3.5s1.339 2.681 3.466 3.5c-.028.18-.077.37-.095.545c-.218 2.058.272 3.543 1.379 4.182c.376.213.803.322 1.235.316a6 6 0 0 0 3.514-1.56a6 6 0 0 0 3.515 1.56a2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182c-.019-.175-.067-.365-.1-.545c2.132-.819 3.471-2.071 3.471-3.5m-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212c-.012.106-.043.222-.058.33q-1.263-.365-2.57-.523a16 16 0 0 0-1.747-1.972a4.9 4.9 0 0 1 2.731-1.234m-7.917 8.781c.172.34.335.68.529 1.017s.395.656.6.969a14 14 0 0 1-1.607-.376a14 14 0 0 1 .478-1.61m-.479-4.076a14 14 0 0 1 1.607-.376q-.308.468-.6.969c-.195.335-.357.677-.529 1.017q-.286-.79-.478-1.61M8.3 12a19 19 0 0 1 .888-1.75q.496-.852 1.076-1.65c.619-.061 1.27-.1 1.954-.1q1.025.001 1.952.1a20 20 0 0 1 1.079 1.654q.488.851.887 1.746a19 19 0 0 1-1.953 3.403a19.2 19.2 0 0 1-3.931 0a20 20 0 0 1-1.066-1.653A19 19 0 0 1 8.3 12m7.816 2.25c.2-.337.358-.677.53-1.017q.286.791.478 1.611a15 15 0 0 1-1.607.376c.202-.314.404-.635.597-.97zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20 20 0 0 0-.6-.97q.814.142 1.606.376a14 14 0 0 1-.478 1.611zM12.217 6.34q.6.563 1.13 1.193q-.555-.031-1.129-.033c-.574-.002-.76.013-1.131.033q.53-.63 1.13-1.193m-4.249-1.7a1.5 1.5 0 0 1 .76-.187a4.9 4.9 0 0 1 2.729 1.233A16 16 0 0 0 9.71 7.658q-1.306.158-2.569.524c-.015-.109-.047-.225-.058-.331c-.171-1.619.151-2.787.885-3.211M3.718 12c0-.9.974-1.83 2.645-2.506c.218.857.504 1.695.856 2.506c-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12m4.25 7.361c-.734-.423-1.056-1.593-.885-3.212c.011-.106.043-.222.058-.331q1.262.365 2.564.524a16.4 16.4 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037m3.11-2.895q.56.033 1.14.034q.58-.001 1.139-.034a14 14 0 0 1-1.14 1.215a14 14 0 0 1-1.139-1.215m5.39 2.895c-.782.451-2.075.072-3.5-1.038a16 16 0 0 0 1.757-1.981a16.4 16.4 0 0 0 2.565-.523c.015.108.046.224.058.33c.175 1.619-.148 2.789-.88 3.212m1.6-4.854A16.6 16.6 0 0 0 17.216 12q.529-1.22.856-2.507c1.671.677 2.646 1.607 2.646 2.507s-.975 1.83-2.646 2.507z" />
                  <path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794" />
                </g>
              </svg>
              {/*django*/}

              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535c-4.791 0-7.288-2.166-7.288-6.32c0-4.002 2.65-6.6 6.753-6.6c.637 0 1.121.05 1.707.203zm0 9.143a3.9 3.9 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365c0 2.09 1.096 3.236 3.109 3.236c.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937c-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625c.561-1.121.739-2.421.739-5.835V6.059zM17.39.021h3.924v4.026H17.39z"
                />
              </svg>
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                <g fill="none">
                  <g clip-path="url(#akarIconsNextjsFill0)">
                    <path
                      fill="currentColor"
                      d="M11.214.006c-.052.005-.216.022-.364.033c-3.408.308-6.6 2.147-8.624 4.974a11.9 11.9 0 0 0-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696c.779.251 1.6.422 2.533.526c.364.04 1.936.04 2.3 0c1.611-.179 2.977-.578 4.323-1.265c.207-.105.247-.134.219-.157a212 212 0 0 1-1.955-2.62l-1.919-2.593l-2.404-3.559a343 343 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51c-.007 3.38-.01 3.516-.052 3.596a.43.43 0 0 1-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105l.005-4.704l.007-4.706l.073-.092a.6.6 0 0 1 .174-.143c.096-.047.133-.051.54-.051c.478 0 .558.018.682.154c.035.038 1.337 2 2.895 4.362l4.734 7.172l1.9 2.878l.097-.063a12.3 12.3 0 0 0 2.465-2.163a11.95 11.95 0 0 0 2.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 0 0-2.498-.523c-.226-.024-1.776-.05-1.97-.03m4.913 7.26a.47.47 0 0 1 .237.276c.018.06.023 1.365.018 4.305l-.007 4.218l-.743-1.14l-.746-1.14V10.72c0-1.983.009-3.097.023-3.151a.48.48 0 0 1 .232-.296c.097-.05.132-.054.5-.054c.347 0 .408.005.486.047"
                    />
                  </g>
                  <defs>
                    <clipPath id="akarIconsNextjsFill0">
                      <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                  </defs>
                </g>
              </svg>
            </div>
            {/* Profile Content */}

            {/* Copyright Section */}
            <div className="mt-4">
              <div className="absolute bottom-4 left-5 flex items-center">
                <span className="text-2xl font-extrabold">©</span>
                <span className="text-md ml-2 font-bold">
                  2025 All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Simplified Contact Section */}
      <div className="md:col-span-2">
        <div className="h-full rounded-2xl border border-purple-500/20 bg-gray-800 p-6">
          <h2 className="font-rezvan mb-6 text-2xl text-purple-400">
            ارتباط با ما
          </h2>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <svg
                  className="h-5 w-5 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">تلفن تماس</p>
                <p className="font-sans text-lg font-medium text-gray-200">
                  ۰۹۱۲ xxx xxxx
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">ایمیل</p>
                <p className="font-sans text-lg font-medium text-gray-200">
                  myleather@example.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10">
                <svg
                  className="h-5 w-5 text-pink-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">آدرس</p>
                <p className="font-rezvan text-lg leading-tight text-gray-200">
                  کرج، شاهین ویلا
                  <br />
                  خیابان پیروزی، پلاک ۱۲۳
                </p>
              </div>
            </div>
          </div>

          {/* Simplified Footer Status */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-400">نسخه نمایشی</span>
            </div>
            <div className="flex gap-2">
              {["purple", "blue", "pink"].map((color) => (
                <div
                  key={color}
                  className={`h-2 w-2 rounded-full bg-${color}-500/30`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
