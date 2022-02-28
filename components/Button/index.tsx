import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type ButtonProps = {
  children: ReactNode
} & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

function Button({ children }: ButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  )
}

export default Button
