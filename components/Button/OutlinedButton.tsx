import React from "react"
import ButtonBase, { ButtonBaseProps } from "./BaseButton"

type OutlinedButtonCustomProps = {
  children: string
}

export type OutlinedButtonProps = Omit<
  ButtonBaseProps,
  keyof OutlinedButtonCustomProps
> &
  OutlinedButtonCustomProps

function OutlinedButton({ className, ...rest }: OutlinedButtonProps) {
  return (
    <ButtonBase
      className={`hover:bg-gray-100 px-4 outline-gray-light rounded-md ${className}  outline outline-1`}
      {...rest}
    />
  )
}

export default OutlinedButton
