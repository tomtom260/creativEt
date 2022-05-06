import React from "react"

type BadgeProps = {
  count: number
}

function Badge({ count }: BadgeProps) {
  return (
    <div className="bg-amber-300 text-white w-6 h-6 text-sm font-bold flex items-center justify-center rounded-full">
      {count}
    </div>
  )
}

export default Badge
