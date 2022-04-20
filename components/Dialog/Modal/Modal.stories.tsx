import { Story, Meta } from "@storybook/react"
import ModalComp, { ModalProps } from "./index"

const meta: Meta = {
  title: "Dialog/Modal",
  component: ModalComp,
}

const Template: Story<ModalProps> = (args) => <Modal {...args} />

export const Modal = Template.bind({})
Modal.args = {}

export default meta
