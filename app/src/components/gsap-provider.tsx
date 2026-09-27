"use client"

import { useEffect } from "react"
import { registerGSAP } from "@/app/src/lib/gsap"

export function GSAPProvider() {
  useEffect(() => {
    registerGSAP()
  }, [])

  return null
}
