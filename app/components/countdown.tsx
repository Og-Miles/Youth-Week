"use client";

import { useEffect, useState } from "react";

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

      if (difference <= 0) return;

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;

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

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className='flex flex-col items-center'>
      <div className='rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 min-w-[110px]'>
        <span className='text-4xl md:text-5xl font-bold text-white'>
          {String(value).padStart(2, "0")}
        </span>
      </div>

      <span className='mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/80'>
        {label}
      </span>
    </div>
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

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Content */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4'>
        <h1 className='mb-12 text-center text-4xl md:text-7xl font-bold text-white'>
          Youth Week is Coming!
        </h1>

        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-8'>
          <TimeBox value={timeLeft.weeks} label='Weeks' />
          <TimeBox value={timeLeft.days} label='Days' />
          <TimeBox value={timeLeft.minutes} label='Minutes' />
          <TimeBox value={timeLeft.seconds} label='Seconds' />
        </div>
      </div>
    </section>
  );
}
