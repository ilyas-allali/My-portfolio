import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { type PointerEvent as ReactPointerEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type PremiumBentoCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
  contentClassName?: string;
};

const PremiumBentoCard = ({
  children,
  className,
  contentClassName,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: PremiumBentoCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 24, mass: 0.35 });
  const smoothGlareX = useSpring(glareX, { stiffness: 180, damping: 22, mass: 0.4 });
  const smoothGlareY = useSpring(glareY, { stiffness: 180, damping: 22, mass: 0.4 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const glare = useMotionTemplate`radial-gradient(circle at ${smoothGlareX}% ${smoothGlareY}%, rgba(212, 175, 55, 0.18), transparent 36%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    if (!reduceMotion) {
      pointerX.set(x - 0.5);
      pointerY.set(y - 0.5);
    }

    glareX.set(x * 100);
    glareY.set(y * 100);
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    pointerX.set(0);
    pointerY.set(0);
    glareX.set(50);
    glareY.set(50);
    onPointerLeave?.(event);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "premium-glass group relative overflow-hidden rounded-lg will-change-transform",
        "transition-colors duration-500 premium-ease",
        className
      )}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/[0.45] to-transparent" />
      <div className={cn("relative z-10 h-full", contentClassName)}>{children}</div>
    </motion.article>
  );
};

export default PremiumBentoCard;
