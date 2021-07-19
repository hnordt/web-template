import React from "react"
import { Dialog, Transition } from "@headlessui/react"
// import cn from "classnames"

interface ModalProps {
  title: string
  description?: string
  open: boolean
  renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  onClose: () => void
  onClosed?: () => void
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  return (
    <Transition
      as={React.Fragment}
      appear
      show={props.open}
      afterLeave={props.onClosed}
    >
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.onClose}
      >
        <div className="px-4 min-h-screen text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-black/50 fixed inset-0" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle h-screen" aria-hidden>
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-middle my-8 w-full max-w-md text-left bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
              {props.title && (
                <div className="p-6 border-b border-gray-200">
                  {props.title && (
                    <Dialog.Title
                      as="h1"
                      className="text-gray-900 text-2xl font-bold"
                    >
                      {props.title}
                    </Dialog.Title>
                  )}
                  {props.description && (
                    <p className="text-gray-500 text-sm">{props.description}</p>
                  )}
                </div>
              )}
              {props.renderContent?.({
                children: props.children,
              }) ?? <div className="p-6">{props.children}</div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}