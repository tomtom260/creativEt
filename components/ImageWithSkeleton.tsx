import React, { useEffect, useRef, useState, ReactDOM } from "react"
import Image, { ImageProps } from "next/image"
import Skeleton from "./Skeleton"

function ImageWithSkeleton({ className, ...rest }: ImageProps) {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const imageRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const [parentHeight, setParentHeight] = useState(0)

  useEffect(() => {
    console.log(imageRef.current.childNodes[0].offsetHeight, "off")
    // let para = document.querySelector("#image span")
    // console.log(para)
    imageRef.current.childNodes[0].offsetHeight &&
      setParentHeight(imageRef.current.childNodes[0].offsetHeight)
  }, [imageRef])

  return (
    <div className="w-full h-full overflow-hidden">
      {showSkeleton && <Skeleton height={parentHeight} />}
      <div className="h-fit  inline-block" ref={imageRef}>
        <Image
          id="image"
          alt=""
          {...rest}
          onLoadingComplete={() => {
            setShowSkeleton(false)
          }}
          className={`${className} ${
            showSkeleton ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  )
}

export default ImageWithSkeleton
