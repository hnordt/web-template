import React from "react"

export default function Card(props) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {props.children}
    </div>
  )
}
