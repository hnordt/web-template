import React from "react"
import { RadioGroup } from "@headlessui/react"
import { useToolbarState, Toolbar, ToolbarItem } from "reakit/Toolbar"
import cn from "classnames"
import products from "data/products"
import Button from "components/core/alpha/Button"
import {
  CheckIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/solid"
import * as Scroll from "react-scroll"
import useNewOrder from "hooks/useNewOrder"

function renderHint(component, totalCount = 0) {
  const hint = ["Escolha"]

  if (totalCount === 0) {
    if (component.min === 0) {
      hint.push(`até ${component.max}`)
    } else if (component.min === component.max) {
      hint.push(component.max)
    } else {
      hint.push(`entre ${component.min} e ${component.max}`)
    }

    return (
      <span className="inline-flex items-center px-3 py-0.5 text-gray-800 text-sm font-medium bg-gray-200 rounded-full">
        {hint.join(" ")} {component.max === 1 ? "opção" : "opções"}
      </span>
    )
  }

  const remaining = component.max - totalCount

  if (remaining === 0) {
    return <CheckIcon className="w-6 h-6 text-green-600" />
  }

  if (component.min === 0) {
    hint.push(`mais ${component.max - remaining}`)
  } else if (component.min === component.max) {
    hint.push(`mais ${remaining}`)
  } else {
    hint.push(
      `entre ${component.min - remaining} e ${component.max - remaining}`
    )
  }

  return (
    <span className="inline-flex items-center px-3 py-0.5 text-gray-800 text-sm font-medium bg-gray-200 rounded-full">
      {hint.join(" ")} {remaining === 1 ? "opção" : "opções"}
    </span>
  )
}

function Option(props) {
  const { component, item, dispatch } = props

  const [searchText, setSearchText] = React.useState("")

  const toolbarState = useToolbarState({
    loop: true,
  })

  if (component.max === 1) {
    return (
      <RadioGroup
        value={item.options[component.id]}
        onChange={(value) => {
          dispatch({
            type: "SELECT_OPTION",
            itemId: item.id,
            componentId: component.id,
            optionId: value,
          })
          props.onFinishSelection?.()
        }}
      >
        <div className="sticky z-10 top-0 px-6 py-5 bg-gray-50 border-b border-t border-gray-200">
          <div className="flex items-center justify-between">
            <RadioGroup.Label className="text-gray-900 text-base font-medium">
              {component.name}
            </RadioGroup.Label>
            <div>
              {renderHint(component, item.options[component.id] ? 1 : 0)}
            </div>
          </div>
        </div>
        <div className="divide-gray-200 divide-y">
          {component.options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option.id}
              className={({ checked }) =>
                cn(
                  "px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 cursor-pointer"
                )
              }
            >
              {({ active, checked }) => (
                <div className="flex items-center justify-between space-x-6">
                  <div>
                    <div className="space-y-1">
                      <h3 className="text-gray-900 text-sm font-medium">
                        {option.name}
                      </h3>
                      {option.description && (
                        <p className="text-gray-500 text-sm">
                          {option.description}
                        </p>
                      )}
                    </div>
                    {option.price > 0 && (
                      <p className="mt-2 text-red-600 text-sm font-medium">
                        +{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(option.price)}
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      checked
                        ? "bg-red-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-red-500" : "",
                      "flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden
                  >
                    <span className="w-2.5 h-2.5 bg-white rounded-full" />
                  </span>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    )
  }

  const totalCount = Object.values(item.options[component.id] ?? []).reduce(
    (acc, v) => (v > 0 ? acc + v : acc),
    0
  )

  const options = component.options.filter((option) =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <div className="sticky z-10 top-0 -mt-px px-6 py-5 bg-gray-50 border-b border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-gray-900 text-base font-medium">
            {component.name}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <input
                className="placeholder-gray-500 pl-7 w-36 h-6 text-gray-900 text-sm leading-none bg-white border border-gray-300 focus:border-red-500 rounded-xl focus:outline-none shadow-sm focus:ring-red-500"
                type="search"
                value={searchText}
                placeholder="Buscar"
                onChange={(e) => {
                  setSearchText(e.target.value)
                  props.onSearch?.()
                }}
              />
            </div>
            <div>{renderHint(component, totalCount)}</div>
          </div>
        </div>
      </div>
      <div className="divide-gray-200 divide-y">
        {options.length === 0 ? (
          <div className={cn("px-6 py-5")}>
            <p className="text-gray-500 text-sm">Nenhum resultado encontrado</p>
          </div>
        ) : (
          options.map((option) => {
            const optionCount = item.options[component.id]?.[option.id] ?? 0

            return (
              <div
                key={option.id}
                className={cn(
                  "group text-left w-full px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
                )}
              >
                <div className="flex items-center justify-between space-x-6">
                  <div>
                    <div className="space-y-1">
                      <h3 className="text-gray-900 text-sm font-medium">
                        {option.name}
                      </h3>
                      {option.description && (
                        <p className="text-gray-500 text-sm">
                          {option.description}
                        </p>
                      )}
                    </div>
                    {option.price > 0 && (
                      <p className="mt-2 text-red-600 text-sm font-medium">
                        +{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(option.price)}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Toolbar
                      {...toolbarState}
                      className="flex items-center space-x-2.5"
                      aria-label="Quantidade"
                    >
                      {optionCount > 0 && (
                        <>
                          <ToolbarItem
                            {...toolbarState}
                            as="button"
                            className="rounded-full focus:outline-none focus:ring-red-500 focus:ring-2"
                            onClick={() => {
                              dispatch({
                                type: "DECREMENT_OPTION",
                                itemId: item.id,
                                componentId: component.id,
                                optionId: option.id,
                              })
                            }}
                          >
                            <MinusCircleIcon className="w-6 h-6 text-red-600" />
                          </ToolbarItem>
                          <ToolbarItem
                            className="text-gray-900 text-base font-medium"
                            disabled
                          >
                            {String(optionCount)}
                          </ToolbarItem>
                        </>
                      )}
                      <ToolbarItem
                        {...toolbarState}
                        as="button"
                        className={cn(
                          "rounded-full focus:outline-none focus:ring-red-500 focus:ring-2",
                          totalCount === component.max
                            ? "opacity-25"
                            : undefined
                        )}
                        disabled={totalCount === component.max}
                        onClick={() => {
                          dispatch({
                            type: "INCREMENT_OPTION",
                            itemId: item.id,
                            componentId: component.id,
                            optionId: option.id,
                          })

                          if (totalCount === component.max - 1) {
                            setSearchText("")
                            setTimeout(() => props.onFinishSelection?.(), 200)
                          }
                        }}
                      >
                        <PlusCircleIcon className="w-6 h-6 text-red-600" />
                      </ToolbarItem>
                    </Toolbar>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const product = products[2]

function getOrderItemTotal(item) {
  return (
    (item.product.price +
      item.product.components.reduce((acc, component) => {
        function findOptionById(id) {
          return component.options.find((option) => option.id === id)
        }

        const selectedOptionId = item.options[component.id]

        if (!selectedOptionId) {
          return acc
        }

        if (typeof selectedOptionId === "object") {
          const quantitiesByOptionId = item.options[component.id]

          return Object.entries(quantitiesByOptionId).reduce(
            (acc, [optionId, quantity]) =>
              acc + findOptionById(optionId).price * quantity,
            0
          )
        }

        return acc + findOptionById(selectedOptionId).price
      }, 0)) *
    item.quantity
  )
}

export default function HomeScreen() {
  const newOrder = useNewOrder()

  const toolbarState = useToolbarState({
    loop: true,
  })

  const commentsInputRef = React.useRef(null)

  React.useEffect(() => {
    newOrder.dispatch({
      type: "ADD_ITEM",
      product,
    })
  }, [])

  const item = newOrder.state.items[0]

  if (!item) {
    return null
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black bg-opacity-75">
      <div
        className={cn(
          "w-full bg-white rounded-md shadow-lg overflow-hidden",
          product.imageUrl ? "max-w-[1200px]" : "max-w-[600px]"
        )}
      >
        <div className="max-h-[637px] flex">
          {product.imageUrl && (
            <div className="flex-1">
              <img
                className="w-full h-full object-cover"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col">
            <Scroll.Element
              className="flex-1 overflow-auto"
              id="containerElement"
            >
              <div className="px-6 py-5">
                <h1 className="text-gray-900 text-lg font-medium">
                  {product.name}
                </h1>
                <p className="mt-0.5 text-gray-500 text-sm">
                  {product.description}
                </p>
                <p className="flex items-baseline mt-3 space-x-2">
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-green-600 text-base font-medium">
                    {product.minPrice > 0 && (
                      <span className="text-base font-normal">
                        A partir de{" "}
                      </span>
                    )}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.minPrice || product.price)}
                  </span>
                </p>
              </div>
              {product.components.map((component, componentIndex) => (
                <Scroll.Element key={component.id} name={component.name}>
                  <Option
                    component={component}
                    item={item}
                    dispatch={newOrder.dispatch}
                    onSearch={() => {
                      Scroll.scroller.scrollTo(component.name, {
                        containerId: "containerElement",
                        smooth: false,
                      })
                    }}
                    onFinishSelection={() => {
                      const component =
                        product.components[componentIndex + 1]?.name

                      if (component) {
                        Scroll.scroller.scrollTo(component, {
                          containerId: "containerElement",
                          smooth: true,
                        })
                      } else {
                        Scroll.scroller.scrollTo("comments", {
                          containerId: "containerElement",
                          smooth: true,
                        })
                        setTimeout(() => commentsInputRef.current.focus(), 0)
                      }
                    }}
                  />
                </Scroll.Element>
              ))}
              <Scroll.Element name="comments">
                <div className="sticky z-10 top-0 px-6 py-5 bg-gray-50 border-b border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-gray-900 text-base font-medium">
                      Algum comentario?
                    </h2>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <textarea
                    ref={commentsInputRef}
                    className="block w-full border-gray-300 focus:border-red-500 rounded-md shadow-sm focus:ring-red-500 sm:text-sm"
                    rows={3}
                    placeholder="Ex.: tirar cebola, maionese à parte, etc."
                  />
                </div>
              </Scroll.Element>
            </Scroll.Element>
            <div className="flex items-center justify-between px-6 py-6 border-t border-gray-200 space-x-4">
              <div>
                <Toolbar
                  {...toolbarState}
                  className="flex items-center space-x-4"
                  aria-label="Quantidade"
                >
                  <ToolbarItem
                    {...toolbarState}
                    as="button"
                    className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full focus:outline-none focus:ring-red-500 focus:ring-offset-2 focus:ring-2"
                    onClick={() => {
                      newOrder.dispatch({
                        type: "DECREMENT_ITEM",
                        itemId: item.id,
                      })
                    }}
                  >
                    <MinusIcon className="w-5 h-5 text-gray-900" />
                  </ToolbarItem>
                  <ToolbarItem
                    className="text-gray-900 text-base font-medium"
                    disabled
                  >
                    {String(item.quantity)}
                  </ToolbarItem>
                  <ToolbarItem
                    {...toolbarState}
                    as="button"
                    className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full focus:outline-none focus:ring-red-500 focus:ring-offset-2 focus:ring-2"
                    onClick={() => {
                      newOrder.dispatch({
                        type: "INCREMENT_ITEM",
                        itemId: item.id,
                      })
                    }}
                  >
                    <PlusIcon className="w-5 h-5 text-gray-900" />
                  </ToolbarItem>
                </Toolbar>
              </div>
              <div>
                <Button size="xl">
                  Adicionar
                  <span>
                    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(getOrderItemTotal(item))}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
