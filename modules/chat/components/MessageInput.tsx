import Input, { InputProps } from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import {
  EmojiHappyIcon,
  PaperClipIcon,
  SearchIcon,
} from "@heroicons/react/outline"
import React from "react"

function MessageInput(props: Omit<InputProps, "variant">) {
  return (
    <Input
      inputContainerStyle="hover:!ring-0 hover:!border-gray-normal !rounded-full "
      className=" !rounded-full placeholder:black placeholder:font-semibold "
      variant={InputType.NORMAL}
      placeholder="Type a message"
      prependComponent={
        <div className="text-gray-dark ">
          <EmojiHappyIcon
            style={{
              margin: 10,
            }}
            width={25}
            height={25}
          />
        </div>
      }
      appendComponent={
        <div className="flex-shrink-0 text-gray-dark ">
          <PaperClipIcon
            style={{
              margin: 10,
            }}
            width={25}
            height={25}
          />
        </div>
      }
      {...props}
    />
  )
}

export default MessageInput
