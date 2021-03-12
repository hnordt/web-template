import React from "react"
import { Transition } from "@headlessui/react"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import cn from "classnames"

export default function Dialog(props) {
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
      // Unmounts DialogOverlay after Transition finishes its work
      timeout = setTimeout(() => {
        setOpen(false)
        onDismissedRef.current?.()
      }, 250)
    }

    return () => clearTimeout(timeout)
  }, [props.open])

  return (
    <DialogOverlay
      className="fixed z-10 inset-0 overflow-y-auto"
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
        {/* This element is to trick the browser into centering the modal contents */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <Transition
          className={cn(
            "inline-block align-bottom text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:w-full sm:max-w-sm",
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
          <DialogContent
            className="focus:outline-none"
            aria-label={props["aria-label"]}
            aria-labelledby={props["aria-labelledby"]}
          >
            {props.children}
          </DialogContent>
        </Transition>
      </div>
    </DialogOverlay>
  )
}
