"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Card component for Apple-style carousel, no image logic, just stacked text
export function Card({ card, index }: { card: any; index: number }) {
  return (
    <motion.div
      className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl mb-4 shadow-lg flex flex-col items-start w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-full flex flex-col gap-2 md:gap-4 items-start">
        {card.category && (
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
            {card.category}
          </span>
        )}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          {card.title}
        </h3>
        {card.content && (
          <div className="mt-1 md:mt-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg font-sans">
            {card.content}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Carousel component for Apple-style cards
export function Carousel({ items }: { items: React.ReactNode[] }) {
  const [current, setCurrent] = React.useState(0);
  const itemCount = items.length;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    setCurrent(idx);
    scrollRef.current?.scrollTo({
      left: idx * (scrollRef.current.offsetWidth || 0),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative max-w-5xl mx-auto mt-10">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatePresence initial={false}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`snap-center shrink-0 w-full md:w-[32rem] transition-transform duration-300 ${current === idx ? "scale-100" : "scale-95 opacity-70"}`}
              style={{ minWidth: "80vw", maxWidth: 560 }}
            >
              {item}
            </div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-accent2" : "bg-gray-300 dark:bg-gray-700"}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="pointer-events-auto bg-white dark:bg-gray-900 rounded-full p-2 shadow border border-gray-300 dark:border-gray-700 text-2xl font-bold"
          onClick={() => goTo((current - 1 + itemCount) % itemCount)}
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button
          className="pointer-events-auto bg-white dark:bg-gray-900 rounded-full p-2 shadow border border-gray-300 dark:border-gray-700 text-2xl font-bold"
          onClick={() => goTo((current + 1) % itemCount)}
          aria-label="Next slide"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
