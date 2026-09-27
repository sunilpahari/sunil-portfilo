import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"
import { client } from "./client"

const imageBuilder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return imageBuilder.image(source)
}
