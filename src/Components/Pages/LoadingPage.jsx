import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  // Automatically hide loader after few seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  const slides = [
    { text: "🚀 Launching your experience...", color: "#1e293b" },
    { text: "💡 Preparing smart content...", color: "#0f172a" },
    { text: "🎨 Designing your dashboard...", color: "#020617" },
    { text: "📊 Almost there...", color: "#111827" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Swiper
        effect="fade"
        loop={true}
        autoplay={{ delay: 1000 }}
        modules={[EffectFade, Autoplay]}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="flex flex-col items-center justify-center w-full h-full text-white"
              style={{ backgroundColor: slide.color }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl font-semibold"
              >
                {slide.text}
              </motion.div>
              <motion.div
                className="mt-6 w-48 h-2 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5 }}
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 5 }}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LoadingPage;
