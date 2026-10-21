"use client";

import { Fragment, useEffect, useState } from "react";

// ponytail: re-mount the page on theme toggle so canvas/JS-initialised colors pick up
// the new tokens. Loses transient page state (e.g. half-typed form); fine for a marketing site.
export function ThemeShell({ children }: { children: React.ReactNode }) {
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    const bump = () => setEpoch((n) => n + 1);
    window.addEventListener("themechange", bump);
    return () => window.removeEventListener("themechange", bump);
  }, []);
  return <Fragment key={epoch}>{children}</Fragment>;
}

// Runs before paint; stored choice wins, otherwise the brand default (dark).
export const THEME_INIT_SCRIPT =
  "(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()";
