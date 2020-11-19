import React from "react"
import { Transition } from "@headlessui/react"
import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogLabel,
  AlertDialogDescription,
} from "@reach/alert-dialog"
import { RiErrorWarningLine } from "react-icons/ri"
import cn from "classnames"

export default function AlertDialog(props) {
  const dismissButtonRef = React.useRef(null)
  const onDismissedRef = React.useRef(props.onDismissed)
  const [open, setOpen] = React.useState(props.open)

  React.useEffect(() => {
    onDismissedRef.current = props.onDismissed
  })

  React.useEffect(() => {
    let timeout = null

    if (props.open) {
      setOpen(true)
    } else {
      // Unmounts AlertDialogOverlay after Transition finishes its work
      timeout = setTimeout(() => {
        setOpen(false)
        onDismissedRef.current?.()
      }, 250)
    }

    return () => clearTimeout(timeout)
  }, [props.open])

  return (
    <AlertDialogOverlay
      className="fixed z-10 inset-0 overflow-y-auto"
      leastDestructiveRef={dismissButtonRef}
      isOpen={open}
      onDismiss={props.onDismiss}
    >
      <div className="flex items-end justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0">
        <Transition
          className="fixed inset-0 transition-opacity"
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          appear
          show={props.open}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </Transition>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        &#8203;
        <Transition
          className={cn(
            "inline-block align-bottom text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:w-full sm:max-w-lg",
            !props.minimal && "p-4 sm:p-6"
          )}
          enter="duration-300 ease-out"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          appear
          show={props.open}
        >
          <AlertDialogContent className="focus:outline-none">
            <div className="sm:flex sm:items-start">
              <div className="flex flex-shrink-0 items-center justify-center mx-auto w-12 h-12 bg-red-100 rounded-full sm:mx-0 sm:w-10 sm:h-10">
                <RiErrorWarningLine className="w-6 h-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <AlertDialogLabel className="text-gray-900 text-lg font-medium">
                  {props.title}
                </AlertDialogLabel>
                <div className="mt-2">
                  <AlertDialogDescription className="text-gray-500 text-sm">
                    {props.description}
                  </AlertDialogDescription>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:flex-row-reverse sm:mt-4">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  className="focus:ring-red inline-flex justify-center px-4 py-2 w-full text-white text-base font-medium hover:bg-red-500 bg-red-600 border focus:border-red-700 border-transparent rounded-md focus:outline-none shadow-sm transition sm:text-sm"
                  type="button"
                  onClick={props.onConfirm}
                >
                  {props.actions[0]}
                </button>
              </span>
              <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  className="focus:ring-blue inline-flex justify-center px-4 py-2 w-full hover:text-gray-500 text-gray-700 text-base font-medium bg-white border focus:border-blue-300 border-gray-300 rounded-md focus:outline-none shadow-sm transition sm:text-sm"
                  type="button"
                  ref={dismissButtonRef}
                  onClick={props.onDismiss}
                >
                  {props.actions[1]}
                </button>
              </span>
            </div>
          </AlertDialogContent>
        </Transition>
      </div>
    </AlertDialogOverlay>
  )
}
