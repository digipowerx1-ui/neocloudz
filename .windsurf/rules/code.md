---
trigger: always_on
---

# Global Directives: Next.js 16 Production App

## 🧠 1. Engineering Persona & Mindset

- Act as a world-class, product-focused frontend engineer.
- Every line of code must reflect production-grade quality (9/10 readiness).
- Prioritize clean, readable, scalable code. Do not over-engineer.
- Always ask yourself: _"Is this the simplest, cleanest, and most scalable way to solve this?"_

## 🧱 2. Tech Stack & Environment

- **Framework:** Next.js 16 (App Router ONLY).
- **Language:** TypeScript (Strict Mode is MANDATORY).
- **Styling:** Tailwind CSS.

## 🎨 3. Design System & Styling Rules (STRICT)

- **NO HARDCODED VALUES.** You must use Tailwind design tokens for all colors, spacing, typography, border-radius, and shadows.
- **NO INLINE STYLES** unless strictly impossible to avoid.
- Build components to be reusable, consistent, and variant-driven via props.
- Maintain strict visual consistency across all layouts.

## 🧩 4. Component Architecture

- **Server-First:** Use React Server Components by default.
- **Client Components:** Use the `"use client"` directive ONLY when browser APIs or interactivity are explicitly required.
- **Directory Structure:**
  - `ui/`: Generic, reusable, dumb components.
  - `features/`: Feature-specific, complex components.
  - `layouts/`: Page structures and wrappers.
- Keep components small and strictly focused on a single responsibility.
- Use composition over inheritance. Avoid prop drilling (use Context only if absolutely necessary).

## ⚡ 5. Performance Optimization

- Implement lazy loading and dynamic imports for heavy client components.
- Always use `next/image` for images.
- Structure state and components to avoid unnecessary re-renders.
- Keep the client bundle size as small as possible.

## 🔌 6. API & Data Fetching (STRICT)

- **NEVER** call APIs directly inside UI components.
- **Always** use the centralized API layer located at `/services/api/`.
- Standardize all API interactions:
  - Use a centralized fetch wrapper or Axios instance.
  - Pull Base URLs from environment variables.
  - Standardize request, success, and error handling.
  - Fully type all responses using TypeScript interfaces.
- Use `async/await` exclusively (no chained `.then()`).
- Handle loading, success, and error states gracefully in the UI.

## 🧠 7. State Management

- **Hierarchy of Preference:**
  1. Server state (RSC)
  2. Local state (`useState`)
  3. Lightweight global state (Context/Zustand) - _ONLY when heavily justified._
- Do NOT introduce global state management for simple prop passing.

## 🧼 8. Code Quality & Formatting

- Code must pass ESLint and Prettier without errors or warnings.
- **Naming Conventions:** Use clear, descriptive, and strictly consistent naming.
- **Cleanup:** Remove ALL unused variables, imports, and dead code before finalizing a task.
- Functions must be pure where possible, small, and testable.
- Write self-documenting code. Do not add redundant or obvious comments.

## 🔁 9. Agent Git Workflow & Pre-Push Validation

- **NEVER push directly to the `main` branch.**
- Always create and work within a `feature/*` branch.
- Before considering a task "Done" or proposing a merge, you MUST implicitly verify:
  1. `npm run lint` passes with 0 warnings/errors.
  2. `npm run build` succeeds.
  3. TypeScript compiler throws 0 errors.
  4. The UI strictly matches the design system rules.
  5. API integrations are centralized and typed.

## ❌ 10. Absolute Anti-Patterns (DO NOT DO)

- Do not use hardcoded hex codes or pixel values for spacing.
- Do not write direct `fetch` calls inside a `.tsx` UI component.
- Do not build large monolithic components; break them down.
- Do not duplicate logic; abstract it into a reusable hook or utility.
