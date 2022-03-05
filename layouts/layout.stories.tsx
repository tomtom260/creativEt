import { Meta, Story } from "@storybook/react"
import DefLayout, { DefaultLayoutProps } from "./DefaultLayout"
import Skeleton from "../components/Skeleton"
const meta: Meta = {
  title: "Layout",
  component: DefLayout,
}

const Template: Story<DefaultLayoutProps> = args => <DefLayout {...args} />

export const DefaultLayout = Template.bind({})
DefaultLayout.args = {
  children: (
    <div className="w-full h-full">
      <Skeleton height={400} />
    </div>
  ),
}

export default meta
