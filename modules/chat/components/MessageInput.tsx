import dynamic from "next/dynamic"
import Input, { InputProps } from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import {
  EmojiHappyIcon,
  PaperClipIcon,
  SearchIcon,
} from "@heroicons/react/outline"
import React, { useState, useRef } from "react"
import Picker from "emoji-picker-react"
import { IEmojiPickerProps } from "emoji-picker-react"

const EmojiPickerNoSSRWrapper = dynamic<IEmojiPickerProps>(
  () => import("emoji-picker-react"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
)

function MessageInput(props: Omit<InputProps, "variant">) {
  const [showEmoji, setShowEmoji] = useState(false)
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const onEmojiClick = (event, emojiObject) => {
    props.onChange(props.value + emojiObject.emoji)
    setShowEmoji(false)
    inputRef.current.focus()
  }

  return (
    <div className="w-full relative">
      {showEmoji && (
        <div className="absolute bottom-16 z-20">
          <EmojiPickerNoSSRWrapper onEmojiClick={onEmojiClick} />
        </div>
      )}
      <Input
        ref={inputRef}
        inputContainerStyle="hover:!ring-0 hover:!border-gray-normal !rounded-full "
        className="!p-0 !min-w-[150px] !px-1 !rounded-full placeholder:black placeholder:font-semibold "
        variant={InputType.NORMAL}
        placeholder="Type a message"
        prependComponent={
          <div
            onClick={() => setShowEmoji((val) => !val)}
            className="text-gray-dark "
          >
            <EmojiHappyIcon width={25} height={25} className="ml-1 sm:ml-2" />
          </div>
        }
        appendComponent={
          <div className="flex-shrink-0 text-gray-dark ">
            <PaperClipIcon className="mr-1 sm:mr-2" width={25} height={25} />
          </div>
        }
        {...props}
      />
    </div>
  )
}

export default MessageInput
