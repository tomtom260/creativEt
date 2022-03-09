import React, { Dispatch, SetStateAction, useState } from "react"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"

export type HorizontalMenuProps = {
  menuItems: string[]
  selectedMenuItem: number
  setSelectedMenuItem: Dispatch<SetStateAction<number>>
}

function HorizontalMenu({
  menuItems,
  selectedMenuItem,
  setSelectedMenuItem,
}: HorizontalMenuProps) {
  return (
    <div className="flex w-full flex-1 overflow-auto justify justify-between">
      {menuItems.map((item, i) => (
        <div
          className={`flex flex-1 h-10 px-2 md:px-4 md:py-10 justify-center items-center border  ${
            selectedMenuItem === i
              ? "border-b-transparent  rounded-t-lg "
              : "border-transparent border-b-inherit border-x-0"
          }
          `}
          onClick={() => setSelectedMenuItem(i)}
          key={item}
        >
          <Text
            className={`${
              selectedMenuItem === i ? "text-black" : "text-gray-normal"
            } cursor-pointer hover:text-black transition-colors hover:duration-500 whitespace-nowrap  md:!text-xl`}
            varaint={TypographyVariant.Body1}
          >
            {item}
          </Text>
        </div>
      ))}
    </div>
  )
}

export default HorizontalMenu
