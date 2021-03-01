import React from "react"
import { Transition } from "@headlessui/react"
import BasePopover from "@reach/popover"

export default function Popover(props) {
  const targetRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)

  return (
    <div
      className="focus:outline-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div ref={targetRef}>{props.children}</div>
      <BasePopover targetRef={targetRef}>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={open}
        >
          <div className="pt-2">
            <div className="p-6 bg-white rounded-md shadow-lg">
              {props.content}
            </div>
          </div>
        </Transition>
      </BasePopover>
    </div>
  )
}
