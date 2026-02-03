import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  description: string;
  position: "left" | "right";
  icon: string;
}

const features: Feature[] = [
  {
    id: "anc",
    title: "Réduction de Bruit Active",
    description: "Isolation totale avec ANC adaptatif qui s'ajuste à votre environnement en temps réel.",
    position: "left",
    icon: "🔇",
  },
  {
    id: "battery",
    title: "48h d'Autonomie",
    description: "Batterie longue durée avec charge rapide. 5 min = 3h d'écoute.",
    position: "right",
    icon: "⚡",
  },
  {
    id: "drivers",
    title: "Drivers 40mm Premium",
    description: "Haut-parleurs personnalisés pour des basses profondes et des aigus cristallins.",
    position: "left",
    icon: "🎵",
  },
  {
    id: "comfort",
    title: "Confort Ultime",
    description: "Coussinets en mousse à mémoire de forme et arceau auto-ajustable.",
    position: "right",
    icon: "☁️",
  },
  {
    id: "spatial",
    title: "Audio Spatial 360°",
    description: "Son immersif avec suivi de la tête pour une expérience cinématique.",
    position: "left",
    icon: "🌐",
  },
  {
    id: "connect",
    title: "Multi-Connexion",
    description: "Bluetooth 5.3 avec connexion simultanée à 2 appareils.",
    position: "right",
    icon: "📱",
  },
];

const FloatingFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        const isLeft = features[index].position === "left";

        // Initial state
        gsap.set(feature, {
          opacity: 0,
          x: isLeft ? -100 : 100,
          scale: 0.8,
        });

        // Animate in
        gsap.to(feature, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });

        // Animate out
        gsap.to(feature, {
          opacity: 0,
          x: isLeft ? 100 : -100,
          scale: 0.9,
          scrollTrigger: {
            trigger: feature,
            start: "bottom 40%",
            end: "bottom 10%",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 pointer-events-none">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          ref={(el) => (featuresRef.current[index] = el)}
          className={`min-h-[60vh] flex items-center ${
            feature.position === "left" ? "justify-start" : "justify-end"
          } px-6 md:px-12 lg:px-20`}
        >
          <div
            className={`max-w-sm p-6 rounded-2xl backdrop-blur-xl border pointer-events-auto
              ${feature.position === "left" ? "ml-0 mr-auto" : "mr-0 ml-auto"}
              bg-card/40 border-border/50 hover:border-primary/50 transition-all duration-500
              hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]`}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl mb-4">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>

            {/* Decorative line */}
            <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingFeatures;
