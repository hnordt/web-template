import React from "react"
import { AlertDialogOverlay, AlertDialogContent } from "@reach/alert-dialog"

export default function AlertDialog(props) {
  let leastDestructiveRef = React.useRef(null)

  return (
    <AlertDialogOverlay
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
      leastDestructiveRef={leastDestructiveRef}
      isOpen={props.open}
      onDismiss={props.onDismiss}
    >
      <AlertDialogContent className="w-full max-w-lg p-6 transition-all transform bg-white rounded-lg shadow-xl">
        {props.children(leastDestructiveRef)}
      </AlertDialogContent>
    </AlertDialogOverlay>
  )
}
