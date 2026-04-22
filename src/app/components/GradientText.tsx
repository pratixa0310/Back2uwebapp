import { ReactNode } from "react";
import { motion } from "motion/react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  gradient = "from-primary via-purple-500 to-pink-500",
  className = "",
  animate = false
}: GradientTextProps) {
  const Wrapper = animate ? motion.span : "span";

  const animationProps = animate ? {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    },
    style: {
      backgroundSize: "200% 200%"
    }
  } : {};

  return (
    <Wrapper
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      {...animationProps}
    >
      {children}
    </Wrapper>
  );
}
