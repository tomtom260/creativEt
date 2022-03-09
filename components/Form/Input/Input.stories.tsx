import { Meta, Story } from "@storybook/react"
import Input, { InputProps } from "."
import { InputVariant } from "./Input.enum"

const meta: Meta = {
  title: "Form/Input",
  component: Input,
}

const Template: Story<InputProps> = args => <Input {...args} />

export const DefaultInput = Template.bind({})
DefaultInput.args = {
  variant: InputVariant.NORMAL,
  label: "Location",
  error: "Location is Required!",
  description: "Enter a city that is close to you",
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  variant: InputVariant.PASSWORD,
  label: "Location",
  error: "Location is Required!",
  description: "Enter a city that is close to you",
}

export default meta
