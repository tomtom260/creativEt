import React, { HTMLAttributes } from "react"
import { TypographyVariant } from "./textVariant.enum"

export type TypographyProps = {
  children: string
  className?: HTMLAttributes<HTMLParagraphElement>["className"]
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children" | "className">

const H1 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase {...rest} className={`${className}`}>
    {children}
  </TypographyBase>
)

const H2 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase {...rest} className={`${className}`}>
    {children}
  </TypographyBase>
)

const Body1 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase {...rest} className={`${className}`}>
    {children}
  </TypographyBase>
)
const Body2 = ({ className, children, ...rest }: TypographyProps) => (
  <TypographyBase {...rest} className={`text-xs ${className}`}>
    {children}
  </TypographyBase>
)

function TypographyBase({ children, className, ...rest }: TypographyProps) {
  return (
    <p {...rest} className={className}>
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
