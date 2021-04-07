import React from "react"
import IMask from "imask"

function MaskedInput(props) {
  const { config, ...rest } = props

  const imaskRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const fakeInputRef = React.useRef(null)

  React.useEffect(() => {
    function handleChange(e) {
      imaskRef.current.value = e.target.value
      // imaskRef.current.updateValue() // Avoids a warning
    }

    const input = inputRef.current

    input.addEventListener("input", handleChange)

    return () => input.removeEventListener("input", handleChange)
  }, [])

  React.useEffect(() => {
    imaskRef.current = IMask(fakeInputRef.current, config)

    const imask = imaskRef.current

    imask.on("accept", () => {
      console.log("accept", imask.value)

      // let el = inputRef.current

      // el.setAttribute("value", imask.value)

      // el.dispatchEvent(
      //   new Event("change", {
      //     bubbles: true,
      //   })
      // )
    })

    return () => imask.destroy()
  }, [])

  return (
    <>
      <input {...props} ref={inputRef} type="text" />
      <input ref={fakeInputRef} type="text" />
    </>
  )
}

export default function Index() {
  const [value, setValue] = React.useState("23:59")

  return (
    <main className="p-6">
      <MaskedInput
        config={{
          mask: "H{:}mm",
          blocks: {
            H: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 24,
              placeholderChar: "0",
            },
            mm: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 59,
              placeholderChar: "0",
            },
          },
          overwrite: true,
          lazy: false,
        }}
        onChange={(e) => console.log("change", e)}
        onBlur={(e) => console.log("blur", e.target.value)}
      />
      {/* <MaskedInput
          config={{
            mask: "H{:}mm",
            blocks: {
              H: {
                mask: MaskedRange,
                from: 0,
                to: 24,
                placeholderChar: "0",
              },
              mm: {
                mask: MaskedRange,
                from: 0,
                to: 59,
                placeholderChar: "0",
              },
            },
            overwrite: true,
            lazy: false,
          }}
          defaultValue="23:59"
          onChange={(e) => console.log("change", e)}
          onBlur={(e) => console.log("blur", e.target.value)}
        />
      </div> */}
      <pre className="mt-6 px-6 py-5 text-sm bg-gray-100 rounded-md">
        {JSON.stringify(value)}
      </pre>
    </main>
  )
}
