import React from "react"
import produce from "immer"
import { nanoid } from "nanoid"
import _ from "lodash/fp"

const initialState = {
  items: [],
}

const reducer = produce((draft, action) => {
  const item = action.itemId
    ? draft.items.find((item) => item.id === action.itemId)
    : null

  const component = action.componentId
    ? item.product.components.find(
        (component) => component.id === action.componentId
      )
    : null

  const totalQuantity =
    item && component ? _.sum(_.values(item.options[component.id])) : null

  switch (action.type) {
    case "ADD_ITEM": {
      draft.items.push({
        id: nanoid(12),
        product: action.product,
        options: action.product.components.reduce(
          (acc, component) => ({
            ...acc,
            [component.id]:
              component.max === 1
                ? null
                : component.options.reduce(
                    (acc, option) => ({
                      ...acc,
                      [option.id]: 0,
                    }),
                    {}
                  ),
          }),
          {}
        ),
        quantity: 1,
      })

      break
    }

    case "UPDATE_ITEM": {
      break
    }

    case "INCREMENT_ITEM": {
      item.quantity = item.quantity + 1

      break
    }

    case "DECREMENT_ITEM": {
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1
      }

      break
    }

    case "REMOVE_ITEM": {
      const itemIndex = draft.items.findIndex((_item) => _item.id === item.id)

      if (itemIndex > -1) {
        draft.items.splice(itemIndex, 1)
      }

      break
    }

    case "SELECT_OPTION": {
      item.options[component.id] = action.optionId

      break
    }

    case "INCREMENT_OPTION": {
      if (totalQuantity < component.max) {
        item.options[component.id][action.optionId]++
      }

      break
    }

    case "DECREMENT_OPTION": {
      if (totalQuantity > 0) {
        item.options[component.id][action.optionId]--
      }

      break
    }

    default: {
      break
    }
  }
})

export default function useNewOrder() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return {
    state,
    dispatch,
  }
}
