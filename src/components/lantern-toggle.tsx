"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function LanternToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon-lg" className="opacity-0" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={isDark ? "relative bg-white/10 hover:bg-white/20" : "relative bg-orange-100 hover:bg-orange-200"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        <line
          x1="12" y1="1" x2="12" y2="3.5"
          stroke={isDark ? "hsl(220 15% 70%)" : "hsl(25 70% 40%)"}
          strokeWidth="1.5" strokeLinecap="round"
        />
        <path
          d="M7 4.5 C7 3 9.2 2 12 2 C14.8 2 17 3 17 4.5 L17 5.5 L7 5.5 Z"
          fill={isDark ? "hsl(220 15% 55%)" : "hsl(30 80% 55%)"}
        />
        <ellipse
          cx="12" cy="12.5" rx="6" ry="7"
          fill={isDark ? "hsl(220 20% 30%)" : "hsl(35 90% 65%)"}
          stroke={isDark ? "hsl(220 15% 65%)" : "hsl(25 70% 45%)"}
          strokeWidth="1.25"
        />
        <path
          d="M6 9 Q12 11 18 9 M6 12.5 Q12 14.5 18 12.5 M6 16 Q12 18 18 16"
          stroke={isDark ? "hsl(220 15% 60%)" : "hsl(25 70% 40%)"}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M7 5.5 C7 18 7 19.5 12 19.5 C17 19.5 17 18 17 5.5"
          stroke={isDark ? "hsl(220 15% 60%)" : "hsl(25 70% 40%)"}
          strokeWidth="1"
          fill="none"
        />
        {!isDark && (
          <circle cx="12" cy="12.5" r="3" fill="hsl(45 100% 75%)" fillOpacity="0.9">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
        {isDark && (
          <circle cx="12" cy="12.5" r="2" fill="hsl(220 20% 45%)" fillOpacity="0.6" />
        )}
        <line
          x1="12" y1="19.5" x2="12" y2="21.5"
          stroke={isDark ? "hsl(220 15% 70%)" : "hsl(25 70% 40%)"}
          strokeWidth="1.5" strokeLinecap="round"
        />
      </svg>
    </Button>
  );
}
