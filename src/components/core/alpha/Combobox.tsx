import React from "react"
import { useCombobox } from "downshift"

export interface ComboboxOption {
  label: string
  value: any
}

export interface ComboboxProps {
  label?: string
  options: Array<ComboboxOption>
  value?: any
  onChange?: (value: any) => void
}

export default function Combobox(props: ComboboxProps) {
  const [keywords, setKeywords] = React.useState("")

  console.log({
    keywords,
  })

  const options = React.useMemo(
    () => [
      {
        label: "",
        value: "",
      },
      ...props.options.filter((option) =>
        keywords ? option.label.includes(keywords) : true
      ),
    ],
    [props.options, keywords]
  )

  console.log({
    options,
    selectedItem: options.find((option) => option.value === props.value),
  })

  const combobox = useCombobox({
    items: options,
    selectedItem: options.find((option) => option.value === props.value),
    itemToString: (item) => item?.label ?? "",
    onInputValueChange: (changes) => setKeywords(changes.inputValue),
    onSelectedItemChange: (changes) =>
      props.onChange?.(changes.selectedItem?.value ?? ""),
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
          options.map((option, index) => (
            <li
              key={option.value}
              style={
                combobox.highlightedIndex === index
                  ? {
                      backgroundColor: "#bde4ff",
                    }
                  : {}
              }
              {...combobox.getItemProps({
                item: option,
                index,
              })}
            >
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  )
}
