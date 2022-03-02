import React from "react"
import { Meta, Story } from "@storybook/react"
import Button, { ButtonProps } from "./index"

const meta: Meta = {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Primary",
      description: "Hello",
    },
    onClick: {
      description: "ooo",
    },
  },
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Primary = Template.bind({})
export const Secondary = Template.bind({})

// Primary.args = {
//   children: "Primary",
// }

Secondary.args = {
  children: "Secondary",
}

export default meta
