# UI/UX Specifications: The AI Forge

## 1. Aesthetic Direction
- **Theme**: Deep Cyber-Minimalism & Premium Dark Mode.
- **Color Palette**:
  - Primary Base: `#030303` (Pure Obsidian Black)
  - Card Fill: `#0A0A0C` with a `backdrop-blur-md` and `rgba(255, 255, 255, 0.03)` subtle border.
  - Accent Tones: Metallics—Deep Platinum `#E2E8F0` and Brushed Liquid Gold `#D4AF37` for hyper-focused highlights.
- **Typography**:
  - Headings: `Geist Sans` or `Clash Display` (Medium/Semi-Bold) with strict tracking-tight letters.
  - Body: `Geist Mono` or `SF Pro Display` for clean, high-density data visualization.

---

## 2. Interactive Layout Architecture

### Hero Section (`HeroSection.tsx`)
- **Visuals**: A centering ambient dark glow with a custom Canvas particle system behaving like a fluid neural net.
- **Interaction**: The main header text uses a character-splitting shuffle effect on hover (simulating decrypted AI matrix blocks).
- **CTA**: A magnetic button that warping on cursor proximity.

### AI Lab & Systems Architecture Grid (`AILabSection.tsx`)
- **Layout**: Dynamic Bento Grid layout featuring uneven card distributions (3x3 and 2x1 grid structures).
- **Glassmorphism**: Cards use premium reflection highlights that dynamically follow the user's cursor angle (3D tilt-to-mouse projection via Framer Motion's `useMotionValue`).

### Design Gallery & Projects (`DesignGallery.tsx`)
- **Layout**: Horizontal smooth-scroll gallery powered by GSAP ScrollTrigger.
- **Animation**: Cards scale down slightly and increase in brightness when actively entering the viewport focus center.

---

## 3. Motion Blueprint & Timelines

### Page Transitions & Mounts
- **Intro**: Page initialization fires a cascading split-text loading sequence mask opening from the center.
- **Framer Motion Presets**:
  ```typescript
  export const premiumFadeInUp = {
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };