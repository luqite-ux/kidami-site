import { useEffect } from "react";

/**
 * Enhanced scroll reveal — supports multiple animation classes
 * Classes: .reveal, .reveal-left, .reveal-right, .reveal-scale
 * Delays: .reveal-delay-1 through .reveal-delay-6
 */
export function useReveal() {
  useEffect(() => {
    const classes = [".reveal", ".reveal-left", ".reveal-right", ".reveal-scale"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    classes.forEach((cls) => {
      document.querySelectorAll(cls).forEach((el) => observer.observe(el));
    });
    return () => observer.disconnect();
  }, []);
}
