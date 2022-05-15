import React, { forwardRef } from "react"
import { BaseInputProps } from "./BaseInput"
import { InputType, InputVariant } from "./Input.enum"
import BaseInput from "./BaseInput"
import PasswordInput from "./PasswordInput"

export type InputProps = Omit<BaseInputProps, "children"> & {
  variant: InputType
  noBorder?: boolean
}

const InputComp = forwardRef(function Input(props: InputProps, ref) {
  const { variant, ...rest } = props
  switch (variant) {
    case InputType.NORMAL:
      return (
        <BaseInput ref={ref} {...rest}>
          {(prop) => <input ref={ref} {...prop} />}
        </BaseInput>
      )
    case InputType.PASSWORD:
      return <PasswordInput ref={ref} {...rest} />
    case InputType.TEXTAREA:
      return (
        <BaseInput ref={ref} {...rest}>
          {(prop) => (
            <textarea
              ref={ref}
              {...prop}
              className={`${prop.className} !h-28 resize-none `}
            />
          )}
        </BaseInput>
      )
  }
})

export default React.memo(InputComp)
