import LoadingSkeleton, { SkeletonProps } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

function Skeleton(props: SkeletonProps) {
  return (
    <div className="leading-none">
      <LoadingSkeleton {...props} />
    </div>
  )
}

export default Skeleton
