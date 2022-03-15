import { Cloudinary } from "@cloudinary/url-gen"
import { Resize } from "@cloudinary/url-gen/actions/resize"

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: false, // force https, set to false to force http
  },
})

export const getPublicIdFromUrl = (url: string) =>
  url.split(".").slice(-2, -1).join(".").split("/").slice(-2).join("/")

export const getThumnailSizedImage = (publicId: string) =>
  cloudinary.image(publicId).resize(Resize.scale().width(80).height(80)).toURL()

export default cloudinary
