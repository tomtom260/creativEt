import { Meta, Story } from "@storybook/react"
import Cards, { CardsProps } from "."

const meta: Meta = {
  title: "Cards",
  component: Cards,
}

const Template: Story<CardsProps> = args => <Cards {...args} />

export const ContentCard = Template.bind({})
ContentCard.args = {}

export default meta
