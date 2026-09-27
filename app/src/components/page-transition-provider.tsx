"use client"

import { ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { opacity: 0.98 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.12, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!shouldReduceMotion ? (
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-accent"
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "0%", "100%"] }}
          transition={{
            duration: 0.86,
            ease: [0.76, 0, 0.24, 1],
            times: [0, 0.5, 1],
          }}
        />
      ) : null}

      {!shouldReduceMotion ? (
        <motion.div
          key={`progress-${pathname}`}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[90] h-1 bg-accent"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: [1, 1, 0] }}
          transition={{
            duration: 0.86,
            ease: "easeInOut",
            opacity: { times: [0, 0.78, 1] },
          }}
        />
      ) : null}
    </>
  )
}
