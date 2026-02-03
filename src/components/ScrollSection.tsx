import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const ScrollSection = ({ id, children, className = "", variant = "primary" }: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section content on scroll
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Fade out as scrolling past
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
    >
      <div
        ref={contentRef}
        className={`max-w-4xl mx-auto px-6 text-center ${
          variant === "secondary" ? "glow-text-secondary" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default ScrollSection;
