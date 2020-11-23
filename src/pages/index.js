import React from "react"
import { MdClose } from "react-icons/md"

function NewLayout(props) {
  return (
    <div className="w-1/4 h-1/2 border">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Contact Details</h1>
        <span className="relative left-0">
          <MdClose color={"gray"} size={24} />
        </span>
      </div>
      <hr />
      <div className="p-10 text-center">
        <img
          className="m-auto w-28 h-28 rounded-3xl"
          src={props.photo}
          alt={props.alt}
        />
        <h2 className="my-3 text-xl font-semibold">{props.name}</h2>
        <p>{props.role}</p>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <NewLayout
      photo={
        "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
      }
      name="Sarah Jensen"
      role="Executive Officer at Starbucks"
    />
  )
}
