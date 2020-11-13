import React from "react"
import cn from "classnames"

export default function Index() {
  function TextArea(props) {
    return (
      <div>
        <textarea
          className="border rounded focus:outline-none focus:shadow-outline resize-none"
          placeholder={props.placeholder}
        />
      </div>
    )
  }

  return <TextArea placeholder="Escreva aqui" />
}
