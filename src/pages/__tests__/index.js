import React from "react"
import { render, screen } from "@testing-library/react"
import Home from "../"

test("renders Home", () => {
  render(<Home />)
  expect(screen.getByText(/It works!/i)).toBeInTheDocument()
})
