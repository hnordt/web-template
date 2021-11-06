import React from "react"
import { render, screen } from "@testing-library/react"
import Index from "../../src/pages/index"

it("welcomes the user", () => {
  render(<Index />)
  expect(screen.getByText(/works/i)).toBeInTheDocument()
})
