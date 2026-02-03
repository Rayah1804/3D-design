import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="text-center max-w-5xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 opacity-0"
        >
          <span className="text-foreground">L'avenir est </span>
          <span className="gradient-text">maintenant</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
        >
          Découvrez une nouvelle dimension du design produit. 
          Immersif. Révolutionnaire. Iconique.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-105">
            Découvrir
          </button>
          <button className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-lg transition-all duration-300 hover:bg-accent hover:border-muted-foreground">
            En savoir plus
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
