import { motion } from "motion/react";

export function SuccessIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle background */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="currentColor"
        opacity="0.1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Checkmark */}
      <motion.path
        d="M60 100L85 125L140 70"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Confetti */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={100 + Math.cos((i * Math.PI * 2) / 8) * 60}
          cy={100 + Math.sin((i * Math.PI * 2) / 8) * 60}
          r="4"
          fill="currentColor"
          opacity="0.6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.6],
          }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}
