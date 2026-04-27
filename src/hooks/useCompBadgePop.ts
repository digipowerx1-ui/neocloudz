import { useEffect } from "react";

export function useCompBadgePop(
  sectionRef: React.RefObject<HTMLElement | null>,
  badgeSelector = ".comp-badge",
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const badges = section.querySelectorAll<HTMLElement>(badgeSelector);
    if (badges.length === 0) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        badges.forEach((badge) => {
          const delay = parseInt(badge.getAttribute("data-delay") ?? "0", 10);
          timeouts.push(setTimeout(() => badge.classList.add("pop"), delay));
        });
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sectionRef, badgeSelector]);
}
