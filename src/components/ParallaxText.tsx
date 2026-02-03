import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: string;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const ParallaxText = ({
  children,
  direction = "left",
  speed = 1,
  className = "",
}: ParallaxTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        x: direction === "left" ? `-${50 * speed}%` : `${50 * speed}%`,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, [direction, speed]);

  return (
    <div className="overflow-hidden py-4">
      <div
        ref={textRef}
        className={`whitespace-nowrap flex gap-8 ${className}`}
        style={{ transform: direction === "left" ? "translateX(0)" : "translateX(-50%)" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-6xl md:text-8xl lg:text-9xl font-bold opacity-10">
            {children}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ParallaxText;
