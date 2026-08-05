const paths: Record<string, string> = {
  metal: "M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5zM8 12l3 3 5-6",
  pullback: "M13 2 4 14h6l-1 8 9-12h-6l1-8z",
  doors: "M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16M4 21h16M14 12h.01M7 3v18",
  gift: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7s-2-5-5-4-1 4 1 4h4zM12 7s2-5 5-4 1 4-1 4h-4z",
  city: "M3 21h18M5 21V8l5-4v17M10 21V12l6-3v12M16 21V6l4 2v13",
  story: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  magnet: "M6 3v8a6 6 0 0 0 12 0V3M6 3h4v6H6zM14 3h4v6h-4z",
  travel: "M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-6 0v1H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2zM9 5a3 3 0 0 1 6 0v1H9V5zM8 20v2M16 20v2",
  family: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  brain: "M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1 .3 2 .8 2.8A5.5 5.5 0 0 0 4 15.5 5.5 5.5 0 0 0 9.5 21c.8 0 1.6-.2 2.5-.7V3.7c-.9-1.1-1.7-1.7-2.5-1.7zM14.5 2A5.5 5.5 0 0 1 20 7.5c0 1-.3 2-.8 2.8a5.5 5.5 0 0 1 .8 5.2 5.5 5.5 0 0 1-5.5 5.5c-.8 0-1.6-.2-2.5-.7",
  numbers: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  leaf: "M11 20A7 7 0 0 1 4 13c0-4 3-8 8-10 5-2 8-1 8-1s1 3-1 8c-2 5-6 8-8 10zM4 21c4-4 8-8 12-12",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.9 7 23l5-3 5 3-1.2-9.1",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z",
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  spark: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.8 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name] ?? paths.spark} />
    </svg>
  );
}

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill={i <= Math.round(rating) ? "#FFC92E" : "#E5E7EB"} aria-hidden="true">
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
        </svg>
      ))}
    </div>
  );
}
