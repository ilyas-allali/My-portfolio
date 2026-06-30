### 2. `skills.md`
```markdown
# Engineering Skills Ingestion Blueprint

The agent must master and strictly verify these design models and motion behaviors before executing any code changes:

## 1. Motion & Composition Engine
- **GSAP Core + ScrollTrigger**: Native horizontal track controls and fluid section pinning.
- **Framer Motion Gestures**: Pointer coordinates tracking via Spring dynamics (`useSpring`, `useMotionValue`), and shared layout transformations (`layoutId`).

## 2. CSS & Glassmorphism Structuring
- **Tailwind Arbitrary Composites**: Dense grid configurations using arbitrary child modifiers (`[&_child]:style`).
- **Surface Material Mapping**: Strict adherence to the premium-glass utility format:
  ```css
  .premium-glass {
    background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
    border: 1px solid rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(16px);
  }


  ```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.5",
    "@studio-freight/lenis": "^1.0.42",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "canvas-confetti": "^1.9.2"
  }
}