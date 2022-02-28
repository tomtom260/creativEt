import React from "react"
import { Meta, Story } from "@storybook/react"
import Button, { ButtonProps } from "./index"

const meta: Meta = {
  title: "Button",
  component: Button,
}

export const PrimaryButton = () => <Button>Primary</Button>

export default meta
