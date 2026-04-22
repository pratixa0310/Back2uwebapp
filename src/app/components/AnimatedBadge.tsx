import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedBadgeProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning" | "info";
  icon?: ReactNode;
  pulse?: boolean;
}

export function AnimatedBadge({
  children,
  variant = "primary",
  icon,
  pulse = false
}: AnimatedBadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    warning: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm ${variants[variant]} relative overflow-hidden`}
    >
      {pulse && (
        <motion.div
          className="absolute inset-0 bg-current opacity-20"
          animate={{
            scale: [1, 1.5],
            opacity: [0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="text-sm font-medium relative z-10">{children}</span>
    </motion.div>
  );
}
