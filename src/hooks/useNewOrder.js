import React from "react"
import { nanoid } from "nanoid"

// const order = {
//   items: [
//     {
//       id: null,
//       product: {},
//       options: {
//         "component1.id": "option.id",
//         "component2.id": {
//           "option1.id": 1,
//           "option2.id": 1,
//         },
//       },
//       quantity: 1,
//     },
//   ],
// }

const initialState = {
  items: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: nanoid(12),
            product: action.product,
            options: {},
            quantity: 1,
          },
        ],
      }
    }

    case "UPDATE_ITEM": {
      return {
        ...state,
        // TODO
      }
    }

    case "INCREMENT_ITEM": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        }),
      }
    }

    case "DECREMENT_ITEM": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.itemId) {
            return {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          }

          return item
        }),
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.itemId),
      }
    }

    case "SELECT_OPTION": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.itemId) {
            return {
              ...item,
              options: {
                ...item.options,
                [action.componentId]: action.optionId,
              },
            }
          }

          return item
        }),
      }
    }

    case "INCREMENT_OPTION": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.itemId) {
            return {
              ...item,
              options: {
                ...item.options,
                [action.componentId]: {
                  ...item.options[action.componentId],
                  [action.optionId]:
                    (item.options[action.componentId]?.[action.optionId] ?? 0) +
                    1,
                },
              },
            }
          }

          return item
        }),
      }
    }

    case "DECREMENT_OPTION": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.itemId) {
            return {
              ...item,
              options: {
                ...item.options,
                [action.componentId]: {
                  ...item.options[action.componentId],
                  [action.optionId]: Math.max(
                    (item.options[action.componentId]?.[action.optionId] ?? 0) -
                      1,
                    0
                  ),
                },
              },
            }
          }

          return item
        }),
      }
    }

    default: {
      return state
    }
  }
}

export default function useNewOrder() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return {
    state,
    dispatch,
  }
}
