"use client"

import { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type RevealHeadingProps = {
  as?: "h1" | "h2"
  children: ReactNode
  className?: string
}

export function RevealHeading({
  as = "h2",
  children,
  className = "",
}: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion()
  const Heading = as === "h1" ? motion.h1 : motion.h2

  return (
    <div className="overflow-hidden">
      <Heading
        className={className}
        initial={shouldReduceMotion ? false : { y: "110%" }}
        whileInView={shouldReduceMotion ? undefined : { y: "0%" }}
        viewport={{ once: true, amount: 0.72 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Heading>
    </div>
  )
}
