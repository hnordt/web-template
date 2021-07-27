import React from "react"
import { useCombobox } from "downshift"

export interface ComboboxProps {
  label?: string
  value: any
  onChange: (value: any) => void
}

export default function Combobox(props: ComboboxProps) {
  const combobox = useCombobox({
    items: props.value,
    onInputValueChange: (changes) => props.onChange?.(changes.inputValue),
  })

  return (
    <div>
      {props.label && (
        <label {...combobox.getLabelProps()} className="mb-1">
          {props.label}
        </label>
      )}
      <div {...combobox.getComboboxProps()}>
        <input {...combobox.getInputProps()} />
        <button type="button" {...combobox.getToggleButtonProps()}>
          &#8595;
        </button>
      </div>
      <ul
        {...combobox.getMenuProps()}
        style={{
          backgroundColor: "white",
          maxWidth: 300,
          maxHeight: 200,
          overflowY: "auto",
          position: "relative",
        }}
      >
        {combobox.isOpen &&
          props.value.map((item, index) => (
            <li
              key={`${item}${index}`}
              style={
                combobox.highlightedIndex === index
                  ? {
                      backgroundColor: "#bde4ff",
                    }
                  : {}
              }
              {...combobox.getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}
