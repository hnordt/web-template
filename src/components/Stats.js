import React from "react"

export const StatsContext = React.createContext()

export default function Stats(props) {
  return (
    <ol className="flex space-x-6">
      <StatsContext.Provider
        value={{
          variant: props.variant,
        }}
      >
        {props.children}
      </StatsContext.Provider>
    </ol>
  )
}
