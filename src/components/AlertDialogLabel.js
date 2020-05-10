import React from "react"
import { AlertDialogLabel as BaseAlertDialogLabel } from "@reach/alert-dialog"

export default function AlertDialogLabel(props) {
  return (
    <BaseAlertDialogLabel className="text-lg font-medium leading-6 text-gray-900">
      {props.children}
    </BaseAlertDialogLabel>
  )
}
