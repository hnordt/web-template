import React from "react"

export default function Stats(props) {
  return (
    <dl className="flex space-x-6">
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
          variant: props.variant,
        })
      )}
    </dl>
  )
}
