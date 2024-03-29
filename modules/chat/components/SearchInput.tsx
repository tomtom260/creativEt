import Input, { InputProps } from "@/components/Form/Input"
import { InputType } from "@/components/Form/Input/Input.enum"
import { SearchIcon } from "@heroicons/react/outline"
import React from "react"

const SearchInput = React.forwardRef(function SearchInput(props, ref) {
  return (
    <div>
      <Input
        ref={ref}
        inputContainerStyle=" hover:!ring-0 hover:!border-gray-normal !rounded-full w-64"
        className=" !rounded-full placeholder:black placeholder:font-semibold placeholder:uppercase "
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
    </div>
  )
})

export default SearchInput
