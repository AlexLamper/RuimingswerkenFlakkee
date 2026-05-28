"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  /** Vertraging in ms voordat de animatie start (handig voor stagger). */
  delay?: number;
  /** Verticale offset in pixels voor de reveal start (default 14). */
  distance?: number;
  /** Extra classes — gebruik `h-full` voor grid cellen die volledige hoogte nodig hebben. */
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  distance = 14,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: visible && delay > 0 ? `${delay}ms` : "0ms",
    transform: visible ? "none" : `translate3d(0, ${distance}px, 0)`,
    opacity: visible ? 1 : 0,
  };

  return (
    <div
      ref={ref}
      data-reveal
      style={style}
      className={`transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
