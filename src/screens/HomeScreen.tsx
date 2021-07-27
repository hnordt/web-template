import React from "react"
import Combobox from "components/core/alpha/Combobox"

export default function HomeScreen() {
  const items = [
    "Neptunium",
    "Plutonium",
    "Americium",
    "Curium",
    "Berkelium",
    "Californium",
    "Einsteinium",
    "Fermium",
    "Mendelevium",
    "Nobelium",
    "Lawrencium",
    "Rutherfordium",
    "Dubnium",
    "Seaborgium",
    "Bohrium",
    "Hassium",
    "Meitnerium",
    "Darmstadtium",
    "Roentgenium",
    "Copernicium",
    "Nihonium",
    "Flerovium",
    "Moscovium",
    "Livermorium",
    "Tennessine",
    "Oganesson",
  ]

  const [inputItems, setInputItems] = React.useState(items)

  return (
    <main className="p-6">
      <Combobox
        label="Choose an element:"
        value={inputItems}
        onChange={(value) =>
          setInputItems(
            items.filter((item) =>
              item.toLowerCase().startsWith(value.toLowerCase())
            )
          )
        }
      />
    </main>
  )
}
