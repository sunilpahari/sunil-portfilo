import "../globals.css"
import { Bebas_Neue, DM_Sans } from "next/font/google"
import { GSAPProvider } from "@/app/src/components/gsap-provider"
import { Navbar } from "@/app/src/components/navbar"
import { PageTransitionProvider } from "@/app/src/components/page-transition-provider"
import { ThemeProvider } from "@/app/src/components/theme-provider"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${dmSans.variable}`}>
        <ThemeProvider>
          <GSAPProvider />
          <Navbar />
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
