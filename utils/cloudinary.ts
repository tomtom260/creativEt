import { Cloudinary } from "@cloudinary/url-gen"

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: false, // force https, set to false to force http
  },
})

export default cloudinary
