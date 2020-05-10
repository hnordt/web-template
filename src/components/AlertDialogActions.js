import React from "react"
import Toolbar from "components/Toolbar"

export default function AlertDialogActions(props) {
  return (
    <div className="mt-4">
      <Toolbar size="md" reverse>
        {props.children}
      </Toolbar>
    </div>
  )
}
