import _ from "lodash/fp"
import catalog from "data/catalog.json"

const products = _.flatten(
  catalog.data.menu.map((category) =>
    category.itens.map((item) => ({
      _v: 1,
      id: item.code,
      category: {
        id: category.code,
        name: category.name,
        description: null,
      },
      imageUrl: item.logoUrl
        ? `https://static-images.ifood.com.br/image/upload/t_high/pratos/${item.logoUrl}`
        : null,
      name: item.description,
      description: item.details,
      price: item.unitPrice > 0 ? item.unitPrice : item.unitMinPrice,
      originalPrice: item.unitOriginalPrice,
      components: item.choices
        ? item.choices.map((choice) => ({
            id: choice.code,
            name: choice.name,
            min: choice.min,
            max: choice.max,
            options: choice.garnishItens.map((item) => ({
              id: item.code,
              name: item.description,
              description: item.details,
              price: item.unitPrice,
            })),
          }))
        : [],
    }))
  )
)

export default products
