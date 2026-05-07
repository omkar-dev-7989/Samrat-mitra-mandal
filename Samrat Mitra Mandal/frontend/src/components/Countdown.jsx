import { useEffect, useState } from 'react';

const target = new Date('2026-09-14T09:00:00+05:30');

function getDiff() {
  const diff = Math.max(target - new Date(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getDiff);

  useEffect(() => {
    const id = setInterval(() => setTime(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {Object.entries(time).map(([label, value]) => (
        <div key={label} className="rounded-lg border border-gold/35 bg-white/15 p-3 text-center backdrop-blur">
          <div className="text-2xl font-black text-gold sm:text-4xl">{String(value).padStart(2, '0')}</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/80">{{ days: 'दिवस', hours: 'तास', minutes: 'मि.', seconds: 'से.' }[label]}</div>
        </div>
      ))}
    </div>
  );
}
