export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const premiumFadeInUp = {
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: PREMIUM_EASE },
};
