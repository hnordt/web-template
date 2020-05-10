import React from "react"
import { AlertDialogDescription as BaseAlertDialogDescription } from "@reach/alert-dialog"

export default function AlertDialogDescription(props) {
  return (
    <BaseAlertDialogDescription className="mt-2 text-sm leading-5 text-gray-500">
      {props.children}
    </BaseAlertDialogDescription>
  )
}
