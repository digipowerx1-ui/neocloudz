"use client";

import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollBar = document.getElementById('scroll-bar');
      if (scrollBar) {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollBar.style.width = p + '%';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div id="scroll-bar"></div>;
}
