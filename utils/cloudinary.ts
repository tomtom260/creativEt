import { Cloudinary } from "@cloudinary/url-gen"
import { Resize } from "@cloudinary/url-gen/actions/resize"
import { Transformation } from "@cloudinary/url-gen"
import { source } from "@cloudinary/url-gen/actions/overlay"
import { byAngle } from "@cloudinary/url-gen/actions/rotate"
import { Position } from "@cloudinary/url-gen/qualifiers/position"
import { compass } from "@cloudinary/url-gen/qualifiers/gravity"
import { image, text } from "@cloudinary/url-gen/qualifiers/source"
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle"
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn"

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: process.env.NODE_ENV === "production", // force https, set to false to force http
  },
})

export const getPublicIdFromUrl = (url: string) =>
  url.split(".").slice(-2, -1).join(".").split("/").slice(-2).join("/")

export const getThumnailSizedImage = (publicId: string) =>
  cloudinary.image(publicId).resize(Resize.scale().width(80).height(80)).toURL()

export const getResponsiveImage = (publicId: string, width: number) =>
  cloudinary.image(publicId).resize(Resize.scale().width(width)).toURL()

export const getResponsiveWatermarkedImage = (
  publicId: string,
  width: number
) =>
  cloudinary
    .image(publicId)
    .resize(Resize.scale().width(width))
    .overlay(
      source(
        text("CreativET", new TextStyle("Roboto", 200).fontWeight("bold"))
          .textColor("#f2f2f2")
          .transformation(new Transformation().rotate(byAngle(-20)))
      ).position(
        new Position().gravity(compass("center")).offsetX(-45).offsetY(44)
      )
    )
    .toURL()

export const getDownloadUrlFromPublicId = (publicId: string) =>
  cloudinary.image(publicId).addFlag("attachment").toURL()

export function getOptimisedProfileImage(url: string) {
  if (url.includes("cloudinary")) {
    const publicId = getPublicIdFromUrl(url)
    return getThumnailSizedImage(publicId)
  } else {
    return url
  }
}

export function getDownloadUrl(url: string) {
  const publicId = getPublicIdFromUrl(url)
  return getDownloadUrlFromPublicId(publicId)
}

export default cloudinary
