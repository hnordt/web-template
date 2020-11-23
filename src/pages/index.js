import React from "react"
import { MdClose } from "react-icons/md"

export default function Index(props) {
  return (
    <div className="w-1/4 h-1/2 border">
      <div className="flex flex justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Contact Details</h1>
        <span className="relative left-0">
          <MdClose color={"gray"} size={24} />
        </span>
      </div>
      <hr />
      <div>{props.photo}</div>
    </div>
  )
}
