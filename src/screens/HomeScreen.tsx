import React from "react"
import { Virtuoso } from "react-virtuoso"

export default function HomeScreen() {
  return (
    <div className="p-6">
      <div className="h-[400px]">
        <Virtuoso
          itemContent={(index) => <div>Item {index}</div>}
          totalCount={200}
        />
      </div>
    </div>
  )
}
