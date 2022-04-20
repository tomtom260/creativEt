import { Meta, Story } from "@storybook/react"
import Navigation, { NavigationProps } from "./index"
import { NavigationVariant } from "./nav.enum"

const meta: Meta = {
  title: "Navigation",
  component: Navigation,
}

const Template: Story<NavigationProps> = (args) => <Navigation {...args} />

export const SignedIn = Template.bind({})
SignedIn.args = {
  variant: NavigationVariant.SignedIn,
}

export const SignedOut = Template.bind({})
SignedOut.args = {
  variant: NavigationVariant.SignedOut,
}

export default meta
