import { useEffect } from "react";

const FAQ_Q_SELECTOR = ".faq-q";
const OPEN_CLASS = "open";

export function useFaqAccordion(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const qs = container.querySelectorAll<HTMLElement>(FAQ_Q_SELECTOR);

    const handleFaqClick = (e: Event) => {
      const q = e.currentTarget as HTMLElement;
      const item = q.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains(OPEN_CLASS);
      container.querySelectorAll(".faq-item").forEach((i) => i.classList.remove(OPEN_CLASS));
      if (!isOpen) item.classList.add(OPEN_CLASS);
    };

    qs.forEach((q) => q.addEventListener("click", handleFaqClick));

    return () => {
      qs.forEach((q) => q.removeEventListener("click", handleFaqClick));
    };
  }, [containerRef]);
}
