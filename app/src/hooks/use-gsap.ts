"use client"

import { useEffect, useRef, type RefObject } from "react"
import { gsap, registerGSAP } from "@/app/src/lib/gsap"
import type { ScrollTrigger } from "gsap/ScrollTrigger"

type GSAPAnimation = gsap.core.Animation | ScrollTrigger | void
type GSAPCallback<T extends HTMLElement> = (
  scope: RefObject<T | null>,
) => GSAPAnimation | GSAPAnimation[]

export function useGSAP<T extends HTMLElement>(
  callback: GSAPCallback<T>,
) {
  const scope = useRef<T | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    registerGSAP()

    const context = gsap.context(() => {
      callbackRef.current(scope)
    }, scope)

    return () => {
      context.revert()
    }
  }, [])

  return scope
}
