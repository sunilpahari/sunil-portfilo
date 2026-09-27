"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import type { Variants } from "framer-motion"
import type { PointerEvent } from "react"
import { ArrowDownRight } from "lucide-react"

const previewCards = [
  {
    title: "Brand Systems",
    meta: "Identity / 2026",
    image:
      "https://i.pinimg.com/control1/736x/fe/c3/63/fec3638aa60c4f960c39863bdeefdb35.jpg",
    className:
      "col-span-7 row-span-5 bg-[linear-gradient(135deg,var(--accent)_0_18%,transparent_18%_100%),radial-gradient(circle_at_78%_22%,rgba(255,60,0,0.8),transparent_30%),var(--surface)]",
  },
  {
    title: "Poster Lab",
    meta: "Print / Motion",
    image:
      "https://i.pinimg.com/736x/23/0e/30/230e306f9fc5c35cfe5e1062bf1ce7c3.jpg ",
    className:
      "col-span-5 row-span-4 bg-[repeating-linear-gradient(90deg,rgba(240,240,240,0.92)_0_8px,transparent_8px_18px),linear-gradient(140deg,#171717,var(--surface))]",
  },
  {
    title: "Editorial Grid",
    meta: "Art Direction",
    image:
      "https://i.pinimg.com/control1/736x/da/32/6a/da326a26e41410c67b4ef52c7d76f092.jpg",
    className:
      "col-span-5 row-span-4 bg-[linear-gradient(90deg,transparent_0_48%,var(--accent2)_48%_53%,transparent_53%),linear-gradient(180deg,#f0f0f0_0_34%,#111111_34%_100%)]",
  },
  {
    title: "Digital Campaign",
    meta: "Web / Social",
    image:
      "https://i.pinimg.com/control1/736x/20/3c/ab/203cabcc058a0a384c9c0ff29ef987cf.jpg",
    className:
      "col-span-7 row-span-3 bg-[radial-gradient(circle_at_16%_32%,var(--accent)_0_10%,transparent_10%),linear-gradient(120deg,#1f1f1f,#070707)]",
  },
]

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.12 + index * 0.09,
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero() {
  const words = ["Design", "That", "Cuts", "Through"]
  const shouldReduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 22, mass: 0.4 })
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 22, mass: 0.4 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["20%", "80%"])
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"])
  const reelGlow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(232,255,0,0.28), transparent 34%)`

  const handleReelPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetReelPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen overflow-hidden bg-background px-5 pb-16 pt-32 text-text sm:px-8 lg:px-12 lg:pb-10"
    >
      <motion.div
        aria-hidden="true"
        className="absolute right-[-18rem] top-[-14rem] -z-10 h-[42rem] w-[42rem] rounded-full bg-accent opacity-20 blur-3xl sm:right-[-12rem] lg:h-[48rem] lg:w-[48rem]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -42, 24, 0],
                y: [0, 28, -20, 0],
                scale: [1, 1.12, 0.96, 1],
              }
        }
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(420px,0.84fr)] lg:gap-12">
        <div className="max-w-5xl">
          <motion.p
            className="mb-5 inline-flex border-l border-accent pl-3 text-xs font-semibold uppercase tracking-normal text-accent"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Graphic Designer / Visual Systems
          </motion.p>

          <h1 className="max-w-[12ch] text-7xl leading-[0.82] text-text sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem]">
            {words.map((word, index) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block"
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-8 grid gap-6 border-t border-text/15 pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5, ease: "easeOut" }}
          >
            <p className="max-w-xl text-base leading-7 text-text/75 sm:text-lg">
              Independent designer shaping identities, campaign systems, and tactile digital moments for brands that need to be remembered.
            </p>

            <a
              href="#work"
              className="nav-link inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-accent"
            >
              View Work
              <ArrowDownRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[440px] overflow-hidden border border-text/15 bg-surface p-3 shadow-[0_24px_80px_rgba(0,0,0,0.36)] sm:min-h-[560px]"
          onPointerMove={handleReelPointerMove}
          onPointerLeave={resetReelPointer}
          initial={{ opacity: 0, y: 28, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.25, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformPerspective: 1100,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 opacity-40 mix-blend-screen"
            style={{
              background: shouldReduceMotion
                ? "radial-gradient(circle at 50% 50%, rgba(232,255,0,0.18), transparent 34%)"
                : reelGlow,
            }}
          />
          <div className="absolute left-3 top-3 z-10 flex gap-1.5">
            <span className="h-2.5 w-2.5 bg-accent" />
            <span className="h-2.5 w-2.5 bg-accent-2" />
            <span className="h-2.5 w-2.5 bg-text" />
          </div>

          <div className="grid h-full min-h-[416px] grid-cols-12 grid-rows-9 gap-3 sm:min-h-[536px]">
            {previewCards.map((card, index) => (
              <motion.article
                key={card.title}
                className={`${card.className} relative flex min-h-0 flex-col justify-end overflow-hidden p-4`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0.72)), url(${card.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.48 + index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -10,
                        scale: 1.018,
                        transition: { duration: 0.35, ease: "easeOut" },
                      }
                }
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.28)_46%,transparent_62%)] mix-blend-screen"
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: ["-130%", "130%"],
                        }
                  }
                  transition={{
                    delay: 1.2 + index * 0.28,
                    duration: 2.2,
                    ease: [0.76, 0, 0.24, 1],
                    repeat: Infinity,
                    repeatDelay: 6 + index,
                  }}
                />
                <motion.div
                  className="absolute inset-0 border border-text/10"
                  animate={shouldReduceMotion ? undefined : { opacity: [0.28, 0.7, 0.28] }}
                  transition={{
                    duration: 3.6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <p className="relative text-xs font-semibold uppercase tracking-normal text-text/60">
                  {card.meta}
                </p>
                <h2 className="relative mt-1 text-3xl text-text sm:text-4xl">
                  {card.title}
                </h2>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
