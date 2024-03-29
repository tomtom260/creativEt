// .storybook/preview.js

import "../styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import * as NextImage from "next/image"

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  previewTabs: {
    "storybook/docs/panel": { index: -1 },
  },
}
