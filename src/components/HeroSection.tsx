import cvUrl from "../../Ilyas_Allali_CV_DaiL_Projects.pdf?url";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { Download, Github, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PREMIUM_EASE } from "@/lib/motion";

const MATRIX_CHARS = "01<>[]{}#$%&/\\AIKERNELFORGE";

type NeuralParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frameId = 0;
    let particles: NeuralParticle[] = [];
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = Math.max(34, Math.min(72, Math.floor((rect.width * rect.height) / 18000)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.2 + 0.5,
      }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 180) {
          const force = (180 - distance) / 180;
          particle.vx += (dx / Math.max(distance, 1)) * force * 0.012;
          particle.vy += (dy / Math.max(distance, 1)) * force * 0.012;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            const opacity = 1 - distance / 132;
            context.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.16})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }

        context.fillStyle = "rgba(30, 41, 59, 0.4)";
        context.beginPath();
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />;
};

const MatrixShuffleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  const shuffle = () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);

    const source = Array.from(text);
    iterationRef.current = 0;

    const tick = () => {
      iterationRef.current += 0.72;

      const next = source
        .map((char, index) => {
          if (char === " ") return char;
          if (index < iterationRef.current) return char;
          return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        })
        .join("");

      setDisplayText(next);

      if (iterationRef.current < source.length) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        frameRef.current = null;
      }
    };

    tick();
  };

  return (
    <span
      className={`matrix-glyph inline-flex flex-wrap justify-center ${className}`}
      aria-label={text}
      onFocus={shuffle}
      onPointerEnter={shuffle}
      tabIndex={0}
    >
      {Array.from(displayText).map((char, index) => (
        <span
          key={`${text}-${index}`}
          aria-hidden="true"
          className={char === " " ? "inline-block w-[0.32em]" : "inline-block"}
        >
          {char === " " ? "" : char}
        </span>
      ))}
    </span>
  );
};

type MagneticLinkProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  variant: "primary" | "secondary";
};

const MagneticLink = ({ children, className = "", variant, ...props }: MagneticLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 190, damping: 18, mass: 0.35 });

  const handleMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variantClass =
    variant === "primary"
      ? "bg-[#D4AF37] text-zinc-900 shadow-md shadow-primary/40 hover:bg-[#E7C85C]"
      : "premium-glass text-foreground hover:border-primary/35 hover:text-primary";

  return (
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-500 premium-ease ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const { t, lang } = useLang();
  const phrases = useMemo(
    () => [t("hero.phrase.1"), t("hero.phrase.2"), t("hero.phrase.3"), t("hero.phrase.4")],
    [t],
  );

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setCurrentPhrase(0);
  }, [lang]);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const isFull = !isDeleting && displayText === phrase;
    const isEmpty = isDeleting && displayText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (isFull) {
          setIsDeleting(true);
          return;
        }

        if (isEmpty) {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          return;
        }

        setDisplayText((current) =>
          isDeleting ? phrase.slice(0, current.length - 1) : phrase.slice(0, current.length + 1),
        );
      },
      isFull ? 1300 : isDeleting ? 36 : 68,
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase, phrases]);

  return (
    <section className="relative flex min-h-[60vh] md:min-h-[75vh] items-center justify-center overflow-hidden bg-zinc-50 px-6 pt-24 pb-8 md:pt-36 md:pb-16">
      <NeuralCanvas />
      <div className="obsidian-grid absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.15)_48%,rgba(0,0,0,0.02)_68%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),transparent_32%,rgba(250,250,250,0.88))]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.32em] text-primary/85 md:text-sm"
        >
          {t("hero.kicker")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.08, ease: PREMIUM_EASE }}
          className="metallic-text mb-8 text-4xl font-semibold leading-[1.04] tracking-[0] sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <MatrixShuffleText text="Ilyas Allali" />
          <span className="mx-3 align-middle text-3xl font-light text-zinc-500/55 md:text-5xl">//</span>
          <br className="hidden md:block" />
          <MatrixShuffleText text={t("hero.role")} className="text-gradient" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.24, ease: PREMIUM_EASE }}
          className="premium-glass mx-auto mb-10 inline-flex max-w-full items-center gap-2 rounded-lg px-4 py-3 font-mono text-sm md:px-5"
        >
          <span className="text-primary">&gt;</span>
          <span className="min-h-5 truncate text-zinc-500">{displayText}</span>
          <span className="h-5 w-[2px] shrink-0 animate-pulse bg-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.38, ease: PREMIUM_EASE }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
        >
          <MagneticLink href={cvUrl} download variant="primary">
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("hero.cv")}
          </MagneticLink>
          <MagneticLink
            href="https://wa.me/212608301414"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("hero.talk")}
          </MagneticLink>
          <MagneticLink href="https://github.com/ilyas-allali" target="_blank" rel="noopener noreferrer" variant="secondary">
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
