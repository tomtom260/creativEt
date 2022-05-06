import Input, { InputProps } from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { SearchIcon } from "@heroicons/react/outline"
import React from "react"

function SearchInput(props: Omit<InputProps, "variant">) {
  return (
    <Input
      inputContainerStyle="hover:!ring-0 hover:!border-gray-normal !rounded-full"
      className=" !rounded-full placeholder:black placeholder:font-semibold placeholder:uppercase"
      variant={InputType.NORMAL}
      placeholder="Search"
      prependComponent={
        <div className="text-gray-dark ">
          <SearchIcon
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

export default SearchInput
