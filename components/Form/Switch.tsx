import { Dispatch, SetStateAction } from "react"
import { Switch } from "@headlessui/react"

export default function Toggle({
  onChange,
  value,
}: {
  onChange: Dispatch<SetStateAction<boolean>>
  value: boolean
}) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={`${
        value ? " bg-secondary-normal " : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </Switch>
  )
}
