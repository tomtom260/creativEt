import React, { ReactNode } from "react"
import ButtonBase, { ButtonBaseProps } from "./BaseButton"

type PrimaryButtonCustomProps = {
  children: string
}

export type PrimaryButtonProps = PrimaryButtonCustomProps &
  Omit<ButtonBaseProps, keyof PrimaryButtonCustomProps>

function PrimaryButton({ className, ...rest }: PrimaryButtonProps) {
  return (
    <ButtonBase
      className={` px-4 text-white !justify-center bg-secondary-normal hover:bg-secondary-light tracking-wider rounded-md ${className}`}
      {...rest}
    />
  )
}

export default PrimaryButton
