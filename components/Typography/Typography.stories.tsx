import { Meta, Story } from "@storybook/react"
import TypographyBase, { TypographyProps } from "./index"

const meta: Meta = {
  title: "Typography",
  component: TypographyBase,
}

const Template: Story<TypographyProps> = (args) => <TypographyBase {...args} />

export const H1 = Template.bind({})
H1.args = {
  className: "font-semibold font-mono text-4xl",
  children: "Heading 1",
}

export const H2 = Template.bind({})
H2.args = {
  className: "font-semibold font-sans-serif text-3xl",
  children: "Heading 2",
}

export const Body = Template.bind({})
Body.args = {
  className: "",
  children: "Body",
}

export default meta
