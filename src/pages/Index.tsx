import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavbar from "@/components/GlassNavbar";
import Scene3D from "@/components/Scene3D";
import HeroSection from "@/components/HeroSection";
import ScrollSection from "@/components/ScrollSection";
import FloatingFeatures from "@/components/FloatingFeatures";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxText from "@/components/ParallaxText";
import FeatureHighlight from "@/components/FeatureHighlight";

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

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Glass Navigation */}
      <GlassNavbar />

      {/* Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Parallax Text Banner */}
        <div className="relative py-10 overflow-hidden">
          <ParallaxText direction="left" speed={0.5}>
            PREMIUM AUDIO • DESIGN ICONIQUE •
          </ParallaxText>
        </div>

        {/* Floating Feature Descriptions - These appear as you scroll */}
        <FloatingFeatures />

        {/* Features Section */}
        <ScrollSection id="features" variant="primary">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium mb-8">
            Audio Immersif
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Son </span>
            <span className="gradient-text">Exceptionnel</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Drivers 40mm personnalisés avec réduction de bruit active. 
            Plongez dans un univers sonore d'une clarté cristalline.
          </p>
        </ScrollSection>

        {/* Parallax Text Banner 2 */}
        <div className="relative py-10 overflow-hidden">
          <ParallaxText direction="right" speed={0.7}>
            INNOVATION • TECHNOLOGIE • EXCELLENCE •
          </ParallaxText>
        </div>

        {/* Feature Highlight with Stats */}
        <FeatureHighlight />

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
              { value: "ANC", label: "Réduction Active" },
              { value: "48h", label: "Autonomie" },
              { value: "5.3", label: "Bluetooth" },
              { value: "Hi-Res", label: "Audio Certifié" },
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

        {/* Final Parallax */}
        <div className="relative py-10 overflow-hidden">
          <ParallaxText direction="left" speed={0.6}>
            COMMANDER MAINTENANT • LIVRAISON GRATUITE •
          </ParallaxText>
        </div>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Prêt à </span>
              <span className="gradient-text">Écouter?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Rejoignez des milliers d'audiophiles et découvrez 
              pourquoi nous redéfinissons l'expérience audio.
            </p>
            <button className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-xl transition-all duration-300 hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] hover:scale-105 animate-glow-pulse">
              Commander — 349€
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              Livraison gratuite • Retour 30 jours • Garantie 2 ans
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">🎧</span>
                </div>
                <span className="font-semibold text-foreground tracking-tight">AUDIO PRO</span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2024 Audio Pro. Tous droits réservés.
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
