import React, { HTMLAttributes } from "react"
import { BaseInputProps } from "./BaseInput"
import { InputType, InputVariant } from "./Input.enum"
import BaseInput from "./BaseInput"
import PasswordInput from "./PasswordInput"

export type InputProps = Omit<BaseInputProps, "children"> & {
  variant: InputType
  noBorder?: boolean
}

function Input({ variant, ...rest }: InputProps) {
  switch (variant) {
    case InputType.NORMAL:
      return <BaseInput {...rest}>{(prop) => <input {...prop} />}</BaseInput>
    case InputType.PASSWORD:
      return <PasswordInput {...rest} />
    case InputType.TEXTAREA:
      return (
        <BaseInput {...rest}>
          {(prop) => (
            <textarea
              {...prop}
              className={`${prop.className} !h-28 resize-none `}
            />
          )}
        </BaseInput>
      )
  }
}

export default React.memo(Input)
