const OrderItem = {
  getTotal(item) {
    return (
      (item.product.price +
        item.product.components.reduce((acc, component) => {
          const selectedOptionId = item.options[component.id]

          if (!selectedOptionId) {
            return acc
          }

          if (typeof selectedOptionId === "object") {
            return Object.entries(item.options[component.id]).reduce(
              (acc, [optionId, quantity]) => {
                const option = component.options.find(
                  (option) => option.id === optionId
                )

                return acc + option.price * quantity
              },
              0
            )
          }

          const selectedOption = component.options.find(
            (option) => option.id === selectedOptionId
          )

          return acc + selectedOption.price
        }, 0)) *
      item.quantity
    )
  },
}

export default OrderItem
