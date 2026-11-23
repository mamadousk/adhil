"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function getTimeLeft(target: string): TimeLeft {
  const total = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

const units: { key: keyof Omit<TimeLeft, "total">; label: string }[] = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const emptySubscribe = () => () => {};

export function Countdown({ target }: { target: string }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 1,
  });

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(target));
    const timeout = window.setTimeout(update, 0);
    const id = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(id);
    };
  }, [target]);

  const display = mounted
    ? timeLeft
    : { days: 0, hours: 0, minutes: 0, seconds: 0, total: 1 };

  if (mounted && timeLeft.total <= 0) {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent/10 px-8 py-10 text-center">
        <p className="font-display text-3xl font-extrabold tracking-tight text-fg-inverse sm:text-4xl">
          La boutique est ouverte !
        </p>
        <p className="mt-3 text-fg-inverse-muted">Découvrez nos produits dès maintenant.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      role="timer"
      aria-live="polite"
      aria-label="Compte à rebours avant l'ouverture de la boutique"
    >
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="rounded-3xl border border-line-inverse bg-white/[0.03] px-4 py-6 text-center backdrop-blur sm:py-8"
        >
          <div className="font-mono text-4xl font-medium tracking-tight text-accent sm:text-5xl md:text-6xl">
            {key === "days" ? display[key] : pad(display[key])}
          </div>
          <div className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-fg-inverse-muted sm:text-sm">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
