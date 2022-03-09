import { Meta, Story } from "@storybook/react"
import Menu, { HorizontalMenuProps } from "."

const meta: Meta = {
  title: "Horizontal Menu",
  component: Menu,
  decorators: [
    Story => (
      <div className="m-5 w-full">
        <Story />
      </div>
    ),
  ],
}

const Template: Story<HorizontalMenuProps> = args => <Menu {...args} />

export const HorizontalMenu = Template.bind({})
HorizontalMenu.args = {
  menuItems: ["Shots", "Boosted Shots", "Liked Shots"],
}

export default meta
