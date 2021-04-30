import React from "react"
import { render, screen } from "@testing-library/react"
import HomeScreen from "screens/HomeScreen"

test("renders Home", () => {
  render(<HomeScreen />)
  expect(screen.getByText(/it works/i)).toBeInTheDocument()
})
