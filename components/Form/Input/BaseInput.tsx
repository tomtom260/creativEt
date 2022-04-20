import React, {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useCallback,
} from "react"
import Text from "@/components/Typography"
import {
  TextTheme,
  TypographyVariant,
} from "@/components/Typography/textVariant.enum"

type BaseInputCustomProps = {
  label: string
  error?: string
  value: string
  inputContainerStyle: string
  onChange: (value: string) => void
  description?: string
  appendComponent?: ReactNode
  prependComponent?: ReactNode
  noBorder?: boolean
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
  inputContainerStyle,
  children,
  noBorder = false,
  onChange,
  className,
  ...rest
}: BaseInputProps) {
  const Container = useCallback(children, [])
  return (
    <div className="flex-1">
      <Text
        className="!font-mono  !text-xl mb-2 sm:mb-4"
        varaint={TypographyVariant.Body1}
      >
        {label}
      </Text>
      <div
        className={`flex flex-1  relative  rounded-lg focus:border-transparent ${
          noBorder
            ? "border-0"
            : "border  hover:ring-1 focus:ring-1  hover:border-transparent  border-gray-normal  !ring-secondary-normal"
        } ${inputContainerStyle} `}
      >
        {prependComponent}
        <Container
          onChange={(e) => {
            onChange(e?.target.value)
          }}
          className={`h-12 py-4 px-2 flex-1 border-0 rounded-lg outline-none !ring-0 ${className}`}
          {...rest}
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
