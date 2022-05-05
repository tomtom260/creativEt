import React, { useState } from "react"
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie"
import { scaleOrdinal } from "@visx/scale"
import { Group } from "@visx/group"
import { GradientPinkBlue } from "@visx/gradient"
import { animated, useTransition, interpolate } from "react-spring"

// data and types
const incomes: Income[] = [
  {
    label: "Jobs",
    usage: 23,
  },
  {
    label: "Posts",
    usage: 77,
  },
]

type IncomeTypes = keyof Income

interface Income {
  label: string
  usage: number
}

// accessor functions
const usage = (d: Income) => d.usage

// color scales
const getBrowserColor = scaleOrdinal({
  domain: incomes,
  range: [
    "rgba(93,30,91,1)",
    "rgba(93,30,91,0.8)",
    // "rgba(93,30,91,0.6)",
    // "rgba(93,30,91,0.4)",
  ],
})

const defaultMargin = { top: 5, right: 0, bottom: 5, left: 0 }

export type PieProps = {
  width: number
  height: number
  margin?: typeof defaultMargin
  animate?: boolean
}

export default function PieChart({
  width,
  height,
  margin = defaultMargin,
  animate = true,
}: PieProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null)

  if (width < 10) return null

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="visx-pie-gradient" />
      <rect
        rx={14}
        width={width}
        height={height}
        // fill="url('#visx-pie-gradient')"
        fill="white"
      />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={
            selectedBrowser
              ? incomes.filter(({ label }) => label === selectedBrowser)
              : incomes
          }
          pieValue={usage}
          outerRadius={radius}
          cornerRadius={3}
          padAngle={0.0}
        >
          {(pie) => (
            <AnimatedPie<Income>
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data.label}
              showUsage={!!selectedBrowser}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setSelectedBrowser(
                  selectedBrowser && selectedBrowser === label ? null : label
                )
              }
              getColor={(arc) => getBrowserColor(arc.data.label)}
            />
          )}
        </Pie>
      </Group>
    </svg>
  )
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number }

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
})
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
})

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean
  getKey: (d: PieArcDatum<Datum>) => string
  getColor: (d: PieArcDatum<Datum>) => string
  onClickDatum: (d: PieArcDatum<Datum>) => void
  showUsage: boolean
  delay?: number
}

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
  showUsage,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  })
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc)
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={interpolate(
            [props.startAngle, props.endAngle],
            (startAngle, endAngle) =>
              path({
                ...arc,
                startAngle,
                endAngle,
              })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            {showUsage && (
              <text
                fill="white"
                x={centroidX}
                y={centroidY - 20}
                dy=".33em"
                fontSize={15}
                textAnchor="middle"
                pointerEvents="none"
              >
                {arc.data.usage} %
              </text>
            )}
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    )
  })
}
