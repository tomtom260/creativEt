import React from "react"
import { Meta, Story } from "@storybook/react"
import Button, { ButtonProps } from "./index"
import ButtonVariants from "./button.enum"
import PlusSVG from "../../assets/icons/Plus"

const meta: Meta = {
  title: "Button",
  component: Button,
}

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: ButtonVariants.PRIMARY,
  children: "Primary",
}

export const Icon = Template.bind({})
Icon.args = {
  variant: ButtonVariants.ICON,
  children: <PlusSVG />,
}

export const Outlined = Template.bind({})
Outlined.args = {
  variant: ButtonVariants.OUTLINED,
  children: "Outlined",
}

export default meta
