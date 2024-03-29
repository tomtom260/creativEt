import React, { HTMLAttributes } from "react"
import { TextTheme, TypographyVariant } from "./textVariant.enum"

export type TypographyProps = {
  children: string
  className?: HTMLAttributes<HTMLParagraphElement>["className"]
  theme?: TextTheme
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children" | "className">

const H1 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase
    {...rest}
    className={`text-xl  md:text-3xl font-bold capitalize tracking-wide font-sans-serif  ${className}`}
  >
    {children}
  </TypographyBase>
)

const H2 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase
    {...rest}
    className={`text-lg  md:text-2xl  font-bold capitalize font-sans-serif  ${className}`}
  >
    {children}
  </TypographyBase>
)

const Body1 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase
    {...rest}
    className={`text-sm md:text-base  font-serif   ${className}`}
  >
    {children}
  </TypographyBase>
)
const Body2 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase {...rest} className={`text-xs ${className}`}>
    {children}
  </TypographyBase>
)

function TypographyBase({
  children,
  className,
  theme = TextTheme.NORMAL,
  ...rest
}: TypographyProps) {
  let themeStyle: TypographyProps["className"]

  switch (theme) {
    case TextTheme.DANGER:
      themeStyle = "text-red-500"
      break
    case TextTheme.WARN:
      themeStyle = ""
      break
    default:
      themeStyle = ""
  }

  return (
    <p {...rest} className={`${themeStyle} ${className}`}>
      {children}
    </p>
  )
}

export type TextProps = {
  varaint: TypographyVariant
} & TypographyProps

const Text = ({ varaint, ...rest }: TextProps) => {
  switch (varaint) {
    case TypographyVariant.H1:
      return <H1 {...rest} />
    case TypographyVariant.H2:
      return <H2 {...rest} />
    case TypographyVariant.Body1:
      return <Body1 {...rest} />
    case TypographyVariant.Body2:
      return <Body2 {...rest} />
  }
}

export default Text
