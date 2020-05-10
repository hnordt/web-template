import React from "react"

export default function TH(props) {
  return (
    <th className="px-6 py-3 text-xs tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 leading-4 bg-gray-50">
      {props.children}
    </th>
  )
}
