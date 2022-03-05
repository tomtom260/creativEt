import React from "react"
import ButtonBase, { ButtonBaseProps } from "./BaseButton"

enum IconButtonTypes {
  ROUNDED,
  SQUARE,
}

type IconButtonCustomProps = {
  type?: IconButtonTypes
}

export type IconButtonProps = Omit<
  ButtonBaseProps,
  keyof IconButtonCustomProps
> &
  IconButtonCustomProps

function IconButton({
  className,
  type = IconButtonTypes.ROUNDED,
  ...rest
}: IconButtonProps) {
  return (
    <ButtonBase
      className={`w-10 hover:bg-gray-100 ${
        type === IconButtonTypes.ROUNDED
          ? "rounded-full"
          : "rounded-lg outline-1 outline-gray-light "
      } ${className}  !justify-center `}
      {...rest}
    />
  )
}

export default IconButton
