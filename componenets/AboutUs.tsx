"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
export const AboutUs = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [animateSection, setAnimateSection] = useState(false);

  useEffect(() => {
    if (inView) setAnimateSection(true);
  }, [inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const glassCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className="font-rezvan relative overflow-hidden shadow-black"
      ref={ref}
      dir="rtl"
    >
      <motion.div
        className="relative min-h-[500px] w-full rounded-[2rem] shadow-2xl"
        initial={{ y: "-100%", height: 0 }}
        animate={
          animateSection
            ? { y: 0, height: "fit-content" }
            : { y: "-100%", height: 0 }
        }
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/AboutUs.jpg"
            alt="چرم مرغوب ایرانی"
            className="h-full object-cover"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content container */}
        <motion.div
          className="z-8 relative mx-auto max-w-6xl p-8"
          initial="hidden"
          animate={animateSection ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          <motion.h2
            className="mb-12 text-right text-5xl font-bold text-amber-100 drop-shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 100 },
              },
            }}
          >
            پیشرو در صنعت چرم ایران
          </motion.h2>

          {/* Top Cards Section */}
          <motion.div
            className="glass-container mb-12 grid gap-8 md:grid-cols-2"
            variants={textVariants}
          >
            {/* Company History */}
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
              <motion.div
                className="glass-card h-full rounded-2xl p-8 text-right backdrop-blur-xl"
                variants={glassCardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="mb-4 text-3xl font-semibold text-amber-50">
                  تاریخچه ما
                </h3>
                <p className="text-lg leading-relaxed text-amber-100/90">
                  شرکت چرم من (My Leather) با بیش از ۲۰ سال سابقه درخشان، پیشگام
                  واردات و توزیع چرم مرغوب در ایران می‌باشد. فعالیت خود را از
                  سال ۱۳۸۰ در تهران آغاز نموده و امروز با شبکه‌ای از ۷ نمایشگاه
                  اختصاصی در شهرهای تهران، اصفهان و مشهد، به برندی پیشرو در صنعت
                  چرم کشور تبدیل شده‌ایم. ما افتخار داریم که با تکیه بر تجربه و
                  کیفیت بی‌نظیر، اعتماد هزاران مشتری را جلب نموده‌ایم.
                </p>
              </motion.div>
            </Tilt>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
                <motion.div
                  className="glass-card flex h-full flex-col justify-center rounded-2xl p-6 text-center backdrop-blur-xl"
                  variants={glassCardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl font-bold text-amber-400">۲۰+</div>
                  <div className="mt-2 text-lg text-amber-100">
                    سال تجربه ارزشمند
                  </div>
                </motion.div>
              </Tilt>

              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
                <motion.div
                  className="glass-card flex h-full flex-col justify-center rounded-2xl p-6 text-center backdrop-blur-xl"
                  variants={glassCardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl font-bold text-amber-400">۷</div>
                  <div className="mt-2 text-lg text-amber-100">
                    نمایشگاه در سراسر ایران
                  </div>
                </motion.div>
              </Tilt>
            </div>
          </motion.div>

          {/* Middle Cards Section */}
          <motion.div
            className="-mx-4 mt-12 grid gap-8 md:grid-cols-2"
            variants={textVariants}
          >
            {/* Quality Assurance */}
            <motion.div className="px-4" variants={glassCardVariants}>
              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
                <div className="glass-card h-full rounded-2xl p-8 text-right backdrop-blur-xl">
                  <h3 className="mb-4 text-3xl font-semibold text-amber-50">
                    تضمین کیفیت
                  </h3>
                  <p className="text-lg leading-relaxed text-amber-100/90">
                    چرم‌های ما از بهترین دباغخانه‌های ایران، ترکیه و ایتالیا
                    تأمین می‌شود. هر قطعه چرم قبل از عرضه، توسط متخصصان ما از
                    نظر ضخامت، انعطاف‌پذیری و یکنواختی رنگ بررسی می‌شود. ما تنها
                    چرم‌های درجه یک (Grade A) با گواهی اصالت را ارائه می‌دهیم.
                  </p>
                  <div className="mt-6 flex justify-end gap-2">
                    <span className="rounded-lg bg-amber-800/30 px-3 py-1 text-amber-200">
                      استاندارد ملی ایران
                    </span>
                    <span className="rounded-lg bg-amber-800/30 px-3 py-1 text-amber-200">
                      ضمانت اصالت کالا
                    </span>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* Services */}
            <motion.div
              className="px-4"
              variants={glassCardVariants}
              transition={{ delay: 0.1 }}
            >
              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
                <div className="glass-card h-full rounded-2xl p-8 text-right backdrop-blur-xl">
                  <h3 className="mb-4 text-3xl font-semibold text-amber-50">
                    خدمات ما
                  </h3>
                  <p className="text-lg leading-relaxed text-amber-100/90">
                    ارائه بیش از ۱۲۰ نوع چرم طبیعی در رنگ‌ها و بافت‌های مختلف
                    <br />
                    • فروش عمده به تولیدکنندگان <br />
                    • فروش خرده به صنعتگران و هنرمندان <br />
                    • مشاوره فنی رایگان <br />• آموزش نگهداری اصولی چرم
                  </p>
                  <div className="mt-6 text-left text-amber-200">
                    ★★★★★ ۴.۸/۵ از ۱۵۰۰+ نظر
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </motion.div>

          {/* Bottom Cards Section */}
          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-2"
            variants={textVariants}
          >
            {/* Production */}
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
              <motion.div
                className="glass-card rounded-2xl p-8 text-right backdrop-blur-xl"
                variants={glassCardVariants}
              >
                <h3 className="mb-4 text-3xl font-semibold text-amber-50">
                  تولید اختصاصی
                </h3>
                <p className="text-lg leading-relaxed text-amber-100/90">
                  با استفاده از پیشرفته‌ترین دستگاه‌های برش لیزری، آماده ارائه
                  خدمات اختصاصی شامل:
                  <br />
                  - برش دقیق طبق الگوی شما
                  <br />
                  - چاپ دیجیتال و حکاکی
                  <br />
                  - رنگ‌آمیزی سفارشی
                  <br />- تولید چرم ترکیبی با مواد نوآورانه
                </p>
              </motion.div>
            </Tilt>

            {/* Sustainability */}
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
              <motion.div
                className="glass-card rounded-2xl p-8 text-right backdrop-blur-xl"
                variants={glassCardVariants}
                transition={{ delay: 0.1 }}
              >
                <h3 className="mb-4 text-3xl font-semibold text-amber-50">
                  مسئولیت اجتماعی
                </h3>
                <p className="text-lg leading-relaxed text-amber-100/90">
                  متعهد به توسعه پایدار:
                  <br />
                  • استفاده از رنگ‌های گیاهی سازگار با محیط زیست
                  <br />
                  • بازیافت ۱۰۰% ضایعات تولید
                  <br />
                  • حمایت از کارگاه‌های محلی
                  <br />• مشارکت در پروژه‌های آموزشی صنعت چرم
                </p>
              </motion.div>
            </Tilt>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .glass-card {
          background: rgba(15, 15, 15, 0.25);
          border: 1px solid rgba(245, 158, 11, 0.15);
          box-shadow: 0 8px 32px 0 rgba(87, 59, 0, 0.25);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(30, 30, 30, 0.3);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 12px 40px 0 rgba(87, 59, 0, 0.35);
        }
      `}</style>
    </div>
  );
};
