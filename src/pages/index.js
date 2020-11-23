import React from "react"
import { FiX, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi"

function NewLayout(props) {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-gray-500 text-lg font-semibold">Contact Details</h1>
        <FiX className="w-6 h-6 text-gray-500" />
      </div>
      <div className="p-10 text-center">
        <img
          className="m-auto w-28 h-28 rounded-3xl"
          src={props.photo}
          alt={props.alt}
        />
        <h2 className="mt-3 text-xl font-semibold">{props.name}</h2>
        <p className="text-gray-500 font-medium">
          {props.role} at <a className="text-blue-600">{props.company}</a>
        </p>
        <div className="flex justify-center mt-3 space-x-4">
          <FiFacebook
            size={36}
            color={"gray"}
            className="p-1.5 border-2 border-gray-300 rounded-xl"
          />
          <FiTwitter
            size={36}
            color={"gray"}
            className="p-1.5 border-2 border-gray-300 rounded-xl"
          />
          <FiLinkedin
            size={36}
            color={"gray"}
            className="p-1.5 border-2 border-gray-300 rounded-xl"
          />
        </div>
        <div className="gird-rows-2 grid gap-4 grid-cols-2 justify-start align-bottom ml-8 mt-12 text-left text-gray-500 text-sm font-medium">
          <div className="">
            <h4>Phone</h4>
            <p className="text-gray-900 text-base">{props.phone}</p>
          </div>
          <div>
            <h4>Local Time</h4>
            <p className="text-gray-900 text-base">{props.localTime}</p>
          </div>

          <div>
            <h4>Location</h4>
            <p className="text-gray-900 text-base">{props.location}</p>
          </div>
          <div>
            <br></br>
            <p>
              Data from <a className="text-blue-600">ruby.co</a>
            </p>
          </div>
        </div>
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
      role="Chief Executive Officer"
      company="Starbucks"
      phone="(510) 886-6624"
      localTime="10:13 AM CDT"
      location="Austin, Texas"
    />
  )
}
