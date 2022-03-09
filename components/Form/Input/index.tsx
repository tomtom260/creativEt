import React from "react"
import { BaseInputProps } from "./BaseInput"
import { InputVariant } from "./Input.enum"
import BaseInput from "./BaseInput"
import PasswordInput from "./PasswordInput"

export type InputProps = BaseInputProps & {
  variant: InputVariant
}

function Input(props: InputProps) {
  switch (props.variant) {
    case InputVariant.NORMAL:
      return <BaseInput {...props} />
    case InputVariant.PASSWORD:
      return <PasswordInput {...props} />
  }
}

export default Input
