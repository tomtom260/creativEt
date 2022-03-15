import React, { InputHTMLAttributes, ReactNode } from "react"
import Text from "@/components/Typography"
import {
  TextTheme,
  TypographyVariant,
} from "@/components/Typography/textVariant.enum"
import { InputVariant } from "./Input.enum"

type BaseInputCustomProps<T> = {
  label: string
  error?: string
  value: string
  description?: string
  onChange: () => void
  appendComponent?: ReactNode
  prependComponent?: ReactNode
  as: T
}

export type BaseInputProps<T> = Omit<
  InputHTMLAttributes<
    T extends InputVariant.INPUT ? HTMLInputElement : HTMLAreaElement
  >,
  keyof BaseInputCustomProps<T>
> &
  BaseInputCustomProps<T>

function BaseInput<T>({
  error,
  description = "",
  label,
  appendComponent,
  prependComponent,
  as: As = InputVariant.INPUT,
  ...rest
}: BaseInputProps<T>) {
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
        {
          <As
            {...rest}
            className={`h-12 py-4 px-2 flex-1 border-0 rounded-lg outline-none !ring-0 ${
              As === InputVariant.INPUT ? "" : " !h-28 resize-none"
            } `}
          />
        }
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
