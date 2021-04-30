import React from "react"
import { render, screen } from "@testing-library/react"
import Home from "pages/[[... pathname]]"

test("renders Home", () => {
  render(<Home />)
  expect(screen.getByText(/it works/i)).toBeInTheDocument()
})
