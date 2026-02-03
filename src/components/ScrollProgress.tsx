import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Vertical progress bar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="h-32 w-1 bg-muted/30 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-primary to-secondary rounded-full transition-all duration-150"
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center font-mono">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Horizontal progress bar (top) */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary-glow to-secondary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default ScrollProgress;
