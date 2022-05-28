import React, { ReactNode } from "react"
import ButtonBase, { ButtonBaseProps } from "./BaseButton"

type PrimaryButtonCustomProps = {
  children: string
}

export type PrimaryButtonProps = PrimaryButtonCustomProps &
  Omit<ButtonBaseProps, keyof PrimaryButtonCustomProps>

function PrimaryButton({ className, disabled, ...rest }: PrimaryButtonProps) {
  return (
    <ButtonBase
      disabled={disabled}
      className={`px-2 md:px-4 text-white !justify-center bg-secondary-normal hover:bg-secondary-light tracking-wider rounded-md ${className} ${
        disabled ? "!bg-gray-normal" : ""
      }`}
      {...rest}
    />
  )
}

export default PrimaryButton
