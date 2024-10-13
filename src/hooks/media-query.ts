"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => setMatches(mediaQuery.matches);

    // Initial check
    updateMatches();

    // Add listener for changes
    const mediaQueryListener = () => {
      updateMatches();
    };
    window.addEventListener("resize", mediaQueryListener);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", mediaQueryListener);
    };
  }, [query]);

  return matches;
}

// Usage
