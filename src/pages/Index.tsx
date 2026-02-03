import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavbar from "@/components/GlassNavbar";
import Scene3D from "@/components/Scene3D";
import HeroSection from "@/components/HeroSection";
import ScrollSection from "@/components/ScrollSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const scrollProgress = useRef(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track overall scroll progress for 3D animations
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-background">
      {/* Fixed 3D Canvas Background */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Glass Navigation */}
      <GlassNavbar />

      {/* Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <ScrollSection id="features" variant="primary">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium mb-8">
            Technologie Avancée
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Performance </span>
            <span className="gradient-text">Exceptionnelle</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Conçu avec les matériaux les plus innovants. Chaque détail est pensé 
            pour offrir une expérience utilisateur inégalée.
          </p>
        </ScrollSection>

        {/* Design Section */}
        <ScrollSection id="design" variant="secondary">
          <span className="inline-block px-4 py-2 rounded-full border border-secondary/30 text-secondary text-sm font-medium mb-8">
            Design Iconique
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Beauté </span>
            <span className="gradient-text-secondary">Intemporelle</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Un équilibre parfait entre forme et fonction. Chaque courbe, 
            chaque angle a été méticuleusement étudié.
          </p>
        </ScrollSection>

        {/* Specs Section */}
        <ScrollSection id="specs" variant="primary">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium mb-8">
            Spécifications
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Les Détails </span>
            <span className="gradient-text">Qui Comptent</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              { value: "100%", label: "Recyclable" },
              { value: "48h", label: "Autonomie" },
              { value: "5G", label: "Connectivité" },
              { value: "∞", label: "Possibilités" },
            ].map((spec, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">
                  {spec.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollSection>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Prêt à </span>
              <span className="gradient-text">Commencer?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Rejoignez des milliers de clients satisfaits et découvrez 
              pourquoi nous redéfinissons les standards de l'industrie.
            </p>
            <button className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-xl transition-all duration-300 hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] hover:scale-105 animate-glow-pulse">
              Commander Maintenant
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">3D</span>
                </div>
                <span className="font-semibold text-foreground tracking-tight">PRODUCT</span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2024 Product. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Confidentialité
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Conditions
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
