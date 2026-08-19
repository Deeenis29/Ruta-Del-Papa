import { useEffect, useState } from 'react';

const TARGET = new Date('2026-11-11T14:00:00-05:00').getTime();

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function calc(): Countdown {
  const now = Date.now();
  const diff = TARGET - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    done: false,
  };
}

export function useCountdown() {
  const [countdown, setCountdown] = useState<Countdown>(calc);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
