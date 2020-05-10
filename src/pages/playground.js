import React from "react"
import Toolbar from "components/Toolbar"
import Button from "components/Button"

export default function Playground(props) {
  return (
    <div className="p-4">
      <Toolbar gap="xs" inline>
        <Button variant="secondary">A</Button>
        <Button variant="danger">B</Button>
        <Button variant="secondary" loading>
          C
        </Button>
      </Toolbar>
    </div>
  )
}
