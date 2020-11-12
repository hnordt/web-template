import React from "react"

export function Avatar(props) {
  return (
    <div>
      <img
        className="inline-block rounded-full"
        src={props.src}
        alt={props.alt}
        width={props.size}
        height={props.size}
      />
    </div>
  )
}
