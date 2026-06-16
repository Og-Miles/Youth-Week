"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const targetDate = new Date("2026-07-05T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));

      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
      );

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        weeks,
        days,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='flex flex-col items-center'
    >
      <div
        className='
          min-w-[110px]
          md:min-w-[150px]
          rounded-3xl
          border
          border-white/20
          bg-white/10
          backdrop-blur-xl
          px-6
          py-6
          shadow-[0_0_40px_rgba(255,255,255,0.12)]
        '
      >
        <div className='text-center'>
          <span className='text-4xl md:text-6xl font-black text-white'>
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>

      <span className='mt-4 uppercase tracking-[0.3em] text-xs md:text-sm text-white/80'>
        {label}
      </span>
    </motion.div>
  );

  return (
    <section className='relative min-h-screen overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: "url('/images/youth-week-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/70' />

      {/* Animated Glow */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/10
            blur-3xl
            animate-pulse
          '
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className='mb-4 text-sm md:text-base uppercase tracking-[0.5em] text-white/70'>
            July 5, 2026
          </p>

          <h1 className='text-5xl md:text-8xl font-black text-white'>
            YOUTH WEEK
          </h1>

          <h2 className='mt-3 text-xl md:text-3xl font-light text-white/90'>
            is Coming!
          </h2>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='
            mt-14
            flex
            flex-wrap
            justify-center
            gap-4
            md:gap-8
          '
        >
          <TimeCard value={timeLeft.weeks} label='Weeks' />
          <TimeCard value={timeLeft.days} label='Days' />
          <TimeCard value={timeLeft.minutes} label='Minutes' />
          <TimeCard value={timeLeft.seconds} label='Seconds' />
        </motion.div>

        {/* Theme Scripture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='mt-16 max-w-3xl'
        ></motion.div>
      </div>
    </section>
  );
}
