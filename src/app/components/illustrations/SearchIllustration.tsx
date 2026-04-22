import { motion } from "motion/react";

export function SearchIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Magnifying glass circle */}
      <motion.circle
        cx="80"
        cy="80"
        r="40"
        stroke="currentColor"
        strokeWidth="6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Magnifying glass handle */}
      <motion.line
        x1="110"
        y1="110"
        x2="140"
        y2="140"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Item being found (box) */}
      <motion.rect
        x="60"
        y="60"
        width="40"
        height="40"
        rx="4"
        fill="currentColor"
        opacity="0.2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      />

      {/* Sparkles */}
      {[
        { x: 50, y: 50 },
        { x: 110, y: 50 },
        { x: 50, y: 110 },
      ].map((pos, i) => (
        <motion.g key={i}>
          <motion.line
            x1={pos.x - 5}
            y1={pos.y}
            x2={pos.x + 5}
            y2={pos.y}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              delay: 1.5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          <motion.line
            x1={pos.x}
            y1={pos.y - 5}
            x2={pos.x}
            y2={pos.y + 5}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              delay: 1.5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}
