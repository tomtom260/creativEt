import React from "react"
import { BaseInputProps } from "./BaseInput"
import { InputType, InputVariant } from "./Input.enum"
import BaseInput from "./BaseInput"
import PasswordInput from "./PasswordInput"

export type InputProps = BaseInputProps & {
  variant: InputType
}

function Input(props: InputProps) {
  switch (props.variant) {
    case InputType.NORMAL:
      return <BaseInput {...props} as={InputVariant.INPUT} />
    case InputType.PASSWORD:
      return <PasswordInput {...props} />
    case InputType.TEXTAREA:
      return <BaseInput {...props} as={InputVariant.TEXTAREA} />
  }
}

export default Input
