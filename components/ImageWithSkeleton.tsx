import React, { useEffect, useRef, useState, ReactDOM } from "react"
import Image, { ImageProps } from "next/image"
import Skeleton from "./Skeleton"

type ImageWithSkeletonProps = Omit<ImageProps, "onLoadingComplete"> & {
  imageLoaded?: () => void
}

function ImageWithSkeleton({
  className,
  imageLoaded,
  ...rest
}: ImageWithSkeletonProps) {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const imageRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const [parentHeight, setParentHeight] = useState(0)

  useEffect(() => {
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
            imageLoaded && imageLoaded()
          }}
          className={`${className} ${
            showSkeleton ? "opacity-0" : "opacity-100"
          } object-cover min-h-full min-w-full`}
        />
      </div>
    </div>
  )
}

export default ImageWithSkeleton
