import { useState, useRef, useEffect, SetStateAction } from "react"
import { Combobox } from "@headlessui/react"
import classNames from "@/utils/classNames"
import CloseSVG from "@/assets/icons/Close"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import Button from "../Button"
import ButtonVariants from "../Button/button.enum"

type SelectProps = {
  options: string[]
  selectedOptions: string[]
  setSelectedOptions: React.Dispatch<SetStateAction<string[]>>
  className?: string
}

export default function Select({
  options,
  selectedOptions,
  setSelectedOptions,
  className,
}: SelectProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)
  let [filteredOptions, setFilteredOptions] = useState<string[]>(options)

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) => {
        return (
          option.toLowerCase().includes(inputRef.current.value.toLowerCase()) &&
          !selectedOptions.includes(option)
        )
      })
    )
  }, [selectedOptions, inputRef.current.value])

  const addOption = (newOption: string) => {
    setSelectedOptions(Array.from(new Set([...selectedOptions, newOption])))
    inputRef.current.value = ""
  }

  return (
    <Combobox
      as="div"
      className="flex flex-col gap-0"
      value={selectedOptions}
      onChange={(option: string) => {
        addOption(option)
      }}
      onKeyUp={(e: KeyboardEvent) => {
        if (e.key === "Enter" && inputRef.current.value) {
          addOption(inputRef.current.value)
        }
      }}
    >
      <Combobox.Label
        className={`block text-base md:text-3xl mb-4 text-gray-700 ${className}`}
      >
        Tags
      </Combobox.Label>
      <div
        onClick={() => {
          inputRef.current.focus()
          setIsInputFocused(true)
        }}
        className={` relative border-gray-normal overflow-hidden py-1 md:py-2 min-h-[40px] md:min-h-[66px] px-1 md:px-3 mt-1 rounded-md  flex flex-wrap cursor-text border  ${
          isInputFocused
            ? " shadow-secondary-light border-secondary-normal "
            : ""
        } hover:border-secondary-normal   transition-shadow    `}
      >
        {selectedOptions.map((el) => (
          <div
            className="flex gap-1 my-1 rounded-lg items-center mr-4 p-1 md:p-2 bg-gray-light"
            key={el}
          >
            <Text varaint={TypographyVariant.Body1}>{el}</Text>
            <Button
              className=" !h-min !w-min text-gray-dark"
              onClick={() => {
                setSelectedOptions(
                  selectedOptions.filter((option) => option !== el)
                )
              }}
              variant={ButtonVariants.ICON}
            >
              <CloseSVG className=" text-sm" />
            </Button>
          </div>
        ))}
        <Combobox.Input
          className="flex flex-1 rounded-md border-0 outline-0 p-0 !ring-0 bg-white w-min h-10    sm:text-sm"
          onChange={(event) => {}}
          ref={inputRef}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
      {filteredOptions.length > 0 && (
        <Combobox.Options className=" z-10 mt-4  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option}
              value={option}
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active
                    ? "bg-secondary-light  shadow-lg  text-white"
                    : "text-gray-900"
                )
              }
            >
              {option}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  )
}
