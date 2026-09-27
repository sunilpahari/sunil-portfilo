"use client"

import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { FaBehance, FaDribbble, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { RevealHeading } from "@/app/src/components/reveal-heading"


const fields = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
]

const socialLinks = [
  { label: "Behance", href: "https://behance.net", icon: FaBehance },
  { label: "Dribbble", href: "https://dribbble.com", icon: FaDribbble },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
]

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: "easeOut",
    },
  },
}

export default function Contact() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setStatus("idle")

    const form = event.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(result)
        setStatus("error")
        return
      }

      setStatus("success")
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-background px-5 py-20 text-text sm:px-8 lg:px-12 lg:py-28"
    >
      <motion.div
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div>
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-normal text-accent"
            variants={itemVariants}
          >
            Contact
          </motion.p>
          <RevealHeading className="max-w-4xl text-7xl leading-[0.86] sm:text-8xl lg:text-[10rem]">
            Let&apos;s Make Something Great
          </RevealHeading>

          <motion.form
            className="mt-12 grid gap-9"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            {fields.map((field) => (
              <div key={field.id} className="relative">
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required
                  placeholder=" "
                  className="peer w-full border-0 border-b border-text/28 bg-transparent px-0 pb-3 pt-5 text-lg text-text outline-none transition-colors focus:border-accent"
                />
                <label
                  htmlFor={field.id}
                  className="pointer-events-none absolute left-0 top-5 text-base text-text/56 transition-all duration-300 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                placeholder=" "
                rows={5}
                className="peer w-full resize-none border-0 border-b border-text/28 bg-transparent px-0 pb-3 pt-5 text-lg text-text outline-none transition-colors focus:border-accent"
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-0 top-5 text-base text-text/56 transition-all duration-300 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent"
              >
                Message
              </label>
            </div>

            <button
              type="submit"
              className="group relative mt-2 inline-flex w-fit overflow-hidden border border-accent px-8 py-4 text-sm font-bold uppercase tracking-normal text-accent transition-colors duration-300 hover:text-background focus:text-background"
              disabled={isSubmitting}
            >
              <span className="absolute inset-y-0 left-0 w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full group-focus:w-full" />
              <span className="relative">
                {
                  isSubmitting ? "Sending..." : "Send Message"
                }
              </span>
            </button>
            {status === "success" && (
              <p
                role="status"
                className="text-sm font-medium text-accent"
              >
                Message sent successfully. Thanks for reaching out!
              </p>
            )}

            {status === "error" && (
              <p
                role="alert"
                className="text-sm font-medium text-red-500"
              >
                Something went wrong. Please try again.
              </p>
            )}

          </motion.form>
        </div>

        <motion.aside
          className="border border-text/10 bg-surface p-6 sm:p-8 lg:mt-28"
          variants={itemVariants}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-accent">
            Email
          </p>
          <a
            href="mailto:sunilpahari5555@gmail.com"
            className="break-words text-2xl font-semibold text-text transition-colors hover:text-accent sm:text-3xl"
          >
            hello@sunildesign.com
          </a>

          <div className="mt-10 border-t border-[#222222] pt-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-normal text-accent">
              Social
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-24 items-end justify-between border border-text/10 p-4 text-text transition-colors hover:border-accent hover:text-accent"
                    aria-label={social.label}
                  >
                    <span className="text-xs font-bold uppercase tracking-normal">
                      {social.label}
                    </span>
                    <Icon className="text-4xl transition-transform group-hover:-translate-y-1" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  )
}
