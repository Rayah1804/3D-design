import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: "40", label: "mm Drivers", suffix: "mm" },
  { value: "48", label: "Heures d'autonomie", suffix: "h" },
  { value: "-45", label: "dB Réduction bruit", suffix: "dB" },
  { value: "280", label: "Grammes seulement", suffix: "g" },
];

const FeatureHighlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each stat card
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;

        gsap.fromTo(
          stat,
          {
            opacity: 0,
            y: 60,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // Animate numbers counting up
      numbersRef.current.forEach((number, index) => {
        if (!number) return;

        const endValue = parseInt(stats[index].value);
        const isNegative = stats[index].value.startsWith("-");

        gsap.fromTo(
          { val: 0 },
          { val: Math.abs(endValue) },
          {
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (number) {
                const currentVal = Math.round(this.targets()[0].val);
                number.textContent = isNegative ? `-${currentVal}` : `${currentVal}`;
              }
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-secondary/30 text-secondary text-sm font-medium mb-6">
            Performances
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Les chiffres </span>
            <span className="gradient-text-secondary">parlent</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50
                hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
              style={{ perspective: "1000px" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    ref={(el) => (numbersRef.current[index] = el)}
                    className="text-4xl md:text-5xl font-bold gradient-text"
                  >
                    0
                  </span>
                  <span className="text-xl text-primary font-medium">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-24 h-0.5 bg-gradient-to-l from-primary to-transparent transform rotate-45 origin-top-right translate-y-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;
