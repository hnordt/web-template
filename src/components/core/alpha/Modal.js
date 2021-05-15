import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import cn from "classnames"

export default function Modal(props) {
  return (
    <Transition.Root as={React.Fragment} show={props.open}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        static
        open={props.open}
        onClose={props.onClose}
      >
        <div className="flex items-end justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:py-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                "inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:w-full",
                props.className
              )}
            >
              {props.children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
