import React from "react"
import ButtonBase, { ButtonBaseProps } from "./BaseButton"

type OutlinedButtonCustomProps = {}

export type OutlinedButtonProps = Omit<
  ButtonBaseProps,
  keyof OutlinedButtonCustomProps
> &
  OutlinedButtonCustomProps

function OutlinedButton({ className, ...rest }: OutlinedButtonProps) {
  return (
    <ButtonBase
      className={`px-2 md:px-4 border-0 !justify-center w-min outline-gray-light hover:bg-gray-50 rounded-md ${className}  outline outline-1`}
      {...rest}
    />
  )
}

export default OutlinedButton
