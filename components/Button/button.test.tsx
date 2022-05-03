import React from "react"
import ReactDOMServer from "react-dom/server"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Button from "./index"
import ButtonVariants from "./button.enum"
import userEvent from "@testing-library/user-event"

describe("button works", () => {
  const onClick = jest.fn()
  ReactDOMServer.renderToString(
    <Button onClick={onClick} variant={ButtonVariants.PRIMARY}>
      Save
    </Button>
  )
  const { container, getByRole } = render(
    <Button onClick={onClick} variant={ButtonVariants.PRIMARY}>
      Save
    </Button>
  )
  const button = getByRole("button", {
    name: /save/i,
  })

  test("it renders", () => {
    expect(button).toHaveTextContent("Save")
    expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="h-8 md:h-10 flex justify-between items-center whitespace-nowrap font-sans tracking-wide text-sm md:text-base  px-2 md:px-4 text-white !justify-center bg-secondary-normal hover:bg-secondary-light tracking-wider rounded-md undefined"
        type="button"
        variant="0"
      >
        Save
      </button>
    </div>
  `)
  })

  test("onClick  works", async () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <Button onClick={onClick} variant={ButtonVariants.PRIMARY}>
        Save
      </Button>
    )
    const button = getByRole("button", {
      name: /save/i,
    })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test("primary has background color", () => {
    expect(button).toHaveClass("bg-secondary-normal")
  })
})
