import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  ButtonHTMLAttributes,
} from "react"

type ButtonBaseCustomProps = {
  onClick: () => void
  className?: HTMLAttributes<HTMLButtonElement>["className"]
  children: ReactNode
  appendComponent?: ReactNode
  prependComponent?: ReactNode
}

export type ButtonBaseProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonBaseCustomProps
> &
  ButtonBaseCustomProps

function ButtonBase({
  children,
  onClick,
  className,
  appendComponent,
  prependComponent,
  ...rest
}: ButtonBaseProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      type="button"
      className={`h-8 md:h-10 flex justify-between items-center whitespace-nowrap font-sans tracking-wide text-sm md:text-base  ${className}`}
    >
      {appendComponent && (
        <div className="flex items-center justify-center mr-2">
          {appendComponent}
        </div>
      )}
      {children}
      {prependComponent && (
        <div className="flex items-center justify-center ml-2">
          {prependComponent}
        </div>
      )}
    </button>
  )
}

export default ButtonBase
