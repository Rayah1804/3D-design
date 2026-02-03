import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Accueil" },
  { id: "features", label: "Caractéristiques" },
  { id: "design", label: "Design" },
  { id: "specs", label: "Spécifications" },
];

const GlassNavbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // Determine active section based on scroll position
      const sections = navItems.map((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean);

      const viewportMiddle = window.innerHeight / 3;
      
      for (const section of sections) {
        if (section && section.top <= viewportMiddle && section.bottom > viewportMiddle) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-4" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">3D</span>
          </div>
          <span className="font-semibold text-foreground tracking-tight">PRODUCT</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link text-sm font-medium ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105">
          Commander
        </button>
      </div>
    </nav>
  );
};

export default GlassNavbar;
