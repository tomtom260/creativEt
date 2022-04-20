import { Meta, Story } from "@storybook/react"
import Input, { InputProps } from "."
import { InputType } from "./Input.enum"

const meta: Meta = {
  title: "Form/Input",
  component: Input,
}

const Template: Story<InputProps> = (args) => <Input {...args} />

export const DefaultInput = Template.bind({})
DefaultInput.args = {
  variant: InputType.NORMAL,
  label: "Location",
  error: "Location is Required!",
  description: "Enter a city that is close to you",
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  variant: InputType.PASSWORD,
  label: "Location",
  error: "Location is Required!",
  description: "Enter a city that is close to you",
}

export const TextArea = Template.bind({})
TextArea.args = {
  variant: InputType.TEXTAREA,
  label: "Location",
  error: "Location is Required!",
  description: "Enter a city that is close to you",
}

export default meta
