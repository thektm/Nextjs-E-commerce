"use client";
import React, { memo } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const AboutUs = memo(() => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="relative font-rezvan overflow-hidden" dir="rtl">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AboutUs.jpg"
          alt="چرم مرغوب ایرانی"
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-16 transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-right text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
            پیشرو در صنعت چرم ایران
          </h2>
          <div className="mt-4 h-1 w-24 bg-amber-400/80" />
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* History Column */}
          <div className="lg:col-span-8">
            <div
              className={`space-y-8 transition-all duration-500 ${inView ? "opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-semibold text-amber-300">
                  تاریخچه ما
                </h3>
                <p className="leading-relaxed text-gray-200">
                  شرکت چرم من (My Leather) با بیش از ۲۰ سال سابقه درخشان، پیشگام
                  واردات و توزیع چرم مرغوب در ایران می‌باشد. فعالیت خود را از
                  سال ۱۳۸۰ در تهران آغاز نموده و امروز با شبکه‌ای از ۷ نمایشگاه
                  اختصاصی در شهرهای تهران، اصفهان و مشهد، به برندی پیشرو در صنعت
                  چرم کشور تبدیل شده‌ایم.
                </p>
              </div>

              {/* Quality Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-amber-300">
                    تضمین کیفیت
                  </h3>
                  <p className="text-gray-200">
                    چرم‌های ما از بهترین دباغخانه‌های ایران، ترکیه و ایتالیا
                    تأمین می‌شود. هر قطعه چرم قبل از عرضه، توسط متخصصان ما از
                    نظر ضخامت، انعطاف‌پذیری و یکنواختی رنگ بررسی می‌شود.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-amber-300">
                    تولید اختصاصی
                  </h3>
                  <p className="text-gray-200">
                    ارائه خدمات پیشرفته شامل برش لیزری، چاپ دیجیتال و تولید چرم
                    ترکیبی با مواد نوآورانه
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Services Column */}
          <div className="lg:col-span-4">
            <div
              className={`space-y-8 transition-all delay-150 duration-500 ${inView ? "opacity-100" : "translate-y-8 opacity-0"}`}
            >
              {/* Experience Stats */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-600/15 to-amber-500/10 p-8 text-center">
                <div className="text-5xl font-bold text-amber-400">۲۰+</div>
                <div className="mt-2 text-lg font-medium text-amber-100">
                  سال تجربه
                </div>
                <div className="mt-4 h-px bg-amber-400/20" />
                <div className="mt-4 text-5xl font-bold text-amber-400">۷</div>
                <div className="mt-2 text-lg font-medium text-amber-100">
                  نمایشگاه اختصاصی
                </div>
              </div>

              {/* Services Card */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-amber-300">
                  خدمات ما
                </h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-amber-400" />
                    فروش عمده و خرده
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-amber-400" />
                    مشاوره فنی رایگان
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-amber-400" />
                    آموزش نگهداری اصولی
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutUs;
