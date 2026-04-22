import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

export function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [mounted, setMounted] = useState(false);
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      spring.set(value);
    }
  }, [value, spring, mounted]);

  return <motion.span>{display}</motion.span>;
}
