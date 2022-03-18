import React, { HTMLAttributes } from "react"
import { BaseInputProps } from "./BaseInput"
import { InputType, InputVariant } from "./Input.enum"
import BaseInput from "./BaseInput"
import PasswordInput from "./PasswordInput"

export type InputProps = Omit<BaseInputProps, "children"> & {
  variant: InputType
}

function Input(props: InputProps) {
  switch (props.variant) {
    case InputType.NORMAL:
      return <BaseInput {...props}>{props => <input {...props} />}</BaseInput>
    case InputType.PASSWORD:
      return <PasswordInput {...props} />
    case InputType.TEXTAREA:
      return (
        <BaseInput {...props}>{props => <textarea {...props} />}</BaseInput>
      )
  }
}

export default Input
