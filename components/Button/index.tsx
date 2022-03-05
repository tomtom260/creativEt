import React, { FC } from "react"
import ButtonVariants from "./button.enum"
import PrimaryButton, { PrimaryButtonProps } from "./PrimaryButton"
import IconButton, { IconButtonProps } from "./IconButton"
import OutlinedButton, { OutlinedButtonProps } from "./OutlinedButton"

type PBProps = {
  variant: ButtonVariants.PRIMARY
} & PrimaryButtonProps

type IBProps = {
  variant: ButtonVariants.ICON
} & IconButtonProps

type OBProps = {
  variant: ButtonVariants.OUTLINED
} & OutlinedButtonProps

export type ButtonProps = IBProps | PBProps | OBProps

function Button(props: ButtonProps) {
  switch (props.variant) {
    case ButtonVariants.ICON:
      return <IconButton {...props} />
    case ButtonVariants.PRIMARY:
      return <PrimaryButton {...props} />
    case ButtonVariants.OUTLINED:
      return <OutlinedButton {...props} />
  }
}

export default Button
