import React, { InputHTMLAttributes, ReactNode } from "react"
import Text from "@/components/Typography"
import {
  TextTheme,
  TypographyVariant,
} from "@/components/Typography/textVariant.enum"

type BaseInputCustomProps = {
  label: string
  error: string
  value: string
  description: string
  onChange: () => void
  appendComponent?: ReactNode
  prependComponent?: ReactNode
}

export type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof BaseInputCustomProps
> &
  BaseInputCustomProps

function BaseInput({
  error,
  description,
  label,
  appendComponent,
  prependComponent,
  ...rest
}: BaseInputProps) {
  return (
    <div className="flex-1 px-2">
      <Text
        className="!font-mono  !text-xl mb-2 sm:mb-4"
        varaint={TypographyVariant.Body1}
      >
        {label}
      </Text>
      <div className="flex flex-1  relative focus:border-0 border rounded-lg hover:ring-1 hover:border-0 border-gray-normal focus:ring-2 !ring-secondary-normal">
        {prependComponent}
        <input
          {...rest}
          className="h-12 py-4  flex-1 border-0 rounded-lg outline-none !ring-0  "
        />
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
