import { useRef, useCallback } from "react";

/**
 * MagneticButton — the button subtly follows the cursor
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = ref.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    const btn = ref.current;
    if (btn) btn.style.transform = "translate(0, 0)";
  }, []);

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-btn ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </button>
  );
}

/**
 * FloatingParticles — decorative floating dots/circles
 */
export function FloatingParticles({ count = 12 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.15 + 0.05,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: "rgba(255, 201, 46, 0.4)",
            opacity: p.opacity,
            animation: `float-medium ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * GlowOrb — soft animated gradient orb
 */
export function GlowOrb({
  color = "#ffc92e",
  size = 300,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        animation: "float-slow 8s ease-in-out infinite",
      }}
    />
  );
}
