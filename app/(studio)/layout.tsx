import type { Metadata, Viewport } from "next"
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio"

export const metadata: Metadata = studioMetadata
// Cast needed because next-sanity uses a wider viewportFit string type
export const viewport: Viewport = studioViewport as Viewport

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
