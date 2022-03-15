import EyeOffSVG from "@/assets/icons/EyeOff"
import EyeOnSVG from "@/assets/icons/EyeOn"
import React, { useState } from "react"
import BaseInput, { BaseInputProps } from "./BaseInput"
import { InputVariant } from "./Input.enum"

export type PasswordInputProps = BaseInputProps & Omit<BaseInputProps, "type">

function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>()
  return (
    <BaseInput
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      appendComponent={
        <div
          onClick={() => setPasswordVisible(state => !state)}
          className="flex items-center justify-center py-2 px-3  text-gray-normal"
        >
          {isPasswordVisible ? <EyeOffSVG /> : <EyeOnSVG />}
        </div>
      }
      as={InputVariant.INPUT}
    />
  )
}

export default PasswordInput
