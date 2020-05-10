import React from "react"
import { FaSpinner } from "react-icons/fa"

export default function Spinner() {
  return (
    <FaSpinner
      className="stroke-current"
      style={{
        animation: "spin 850ms linear infinite",
      }}
    />
  )
}
