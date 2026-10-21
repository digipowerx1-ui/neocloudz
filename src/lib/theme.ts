// Theme tokens for canvas/JS code that can't use CSS var(). Values are RGB
// channel triplets ("45, 255, 122") read from :root, cached until data-theme changes.
let cache: Record<string, string> = {};
if (typeof window !== "undefined") {
  new MutationObserver(() => { cache = {}; }).observe(document.documentElement, {
    attributes: true, attributeFilter: ["data-theme"],
  });
}
function v(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return (cache[name] ??= getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback);
}
export const T = {
  get green() { return v("--green-rgb", "45, 255, 122"); },
  get blue() { return v("--blue-rgb", "77, 200, 255"); },
  get amber() { return v("--amber-rgb", "255, 184, 77"); },
  get fg() { return v("--fg-rgb", "255, 255, 255"); },
  get white() { return v("--white-rgb", "240, 245, 240"); },
  get surface() { return v("--surface-rgb", "15, 20, 16"); },
  get bg() { return v("--bg-rgb", "10, 15, 10"); },
};
