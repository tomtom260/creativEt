import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react"
import Text from "@/components/Typography"
import {
  TextTheme,
  TypographyVariant,
} from "@/components/Typography/textVariant.enum"
import { InputVariant } from "./Input.enum"
import { UnionToIntersection } from "reselect/es/types"

type BaseInputCustomProps = {
  label: string
  error?: string
  value: string
  description?: string
  onChange: (value: string | undefined) => void
  appendComponent?: ReactNode
  prependComponent?: ReactNode
  children: (
    props: InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>
  ) => ReactElement
}

export type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLAreaElement>,
  keyof BaseInputCustomProps
> &
  BaseInputCustomProps

function BaseInput({
  error,
  description = "",
  label,
  appendComponent,
  prependComponent,
  children: Container,
  onChange,
  ...rest
}: BaseInputProps) {
  return (
    <div className="flex-1">
      <Text
        className="!font-mono  !text-xl mb-2 sm:mb-4"
        varaint={TypographyVariant.Body1}
      >
        {label}
      </Text>
      <div className="flex flex-1  relative focus:border-transparent  border rounded-lg hover:ring-1 focus:ring-1  hover:border-transparent  border-gray-normal  !ring-secondary-normal">
        {prependComponent}
        <Container onChange={e => onChange(e?.target.value)} {...rest} />
        {appendComponent}
      </div>
      <Text
        className="mt-1 text-gray-normal  "
        varaint={TypographyVariant.Body1}
        theme={error ? TextTheme.DANGER : TextTheme.NORMAL}
      >
        {error || description}
      </Text>
    </div>
  )
}

export default BaseInput
