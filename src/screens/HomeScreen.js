import React from "react"
import { RadioGroup } from "@headlessui/react"
import { useToolbarState, Toolbar, ToolbarItem } from "reakit/Toolbar"
import cn from "classnames"
import _ from "lodash/fp"
import products from "data/products"
import Button from "components/core/alpha/Button"
import {
  CheckIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  SearchCircleIcon,
} from "@heroicons/react/solid"
import * as Scroll from "react-scroll"
import useNewOrder from "hooks/useNewOrder"
import OrderItem from "utils/OrderItem"
import Fuse from "fuse.js"
import Modal from "components/core/alpha/Modal"

function renderHint(component, quantityOfOptionsSelected) {
  const hint = ["Escolha"]

  if (quantityOfOptionsSelected === 0) {
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

  const remaining = component.max - quantityOfOptionsSelected

  if (remaining === 0) {
    return <CheckIcon className="w-6 h-6 text-green-600" />
  }

  if (component.min === 0) {
    hint.push(`mais ${component.max - remaining}`)
  } else if (component.min === component.max) {
    hint.push(`mais ${remaining}`)
  } else {
    hint.push(`mais ${component.max - quantityOfOptionsSelected}`)
  }

  hint.push(remaining === 1 ? "opção" : "opções")

  if (quantityOfOptionsSelected >= component.min) {
    hint.push("se quiser")
  }

  return (
    <span className="inline-flex items-center px-3 py-0.5 text-gray-800 text-sm font-medium bg-gray-200 rounded-full">
      {hint.join(" ")}
    </span>
  )
}

function Option(props) {
  const { component, item, dispatch } = props

  const [searchText, setSearchText] = React.useState("")

  const optionCountToolbarState = useToolbarState({
    loop: true,
  })

  const options = searchText
    ? new Fuse(component.options, {
        keys: [
          {
            name: "name",
            weight: 2,
          },
          {
            name: "description",
            weight: 1,
          },
        ],
        threshold: 0.4,
        distance: 400,
      })
        .search(searchText)
        .map((v) => v.item)
    : component.options

  const quantityOfOptionsSelected =
    component.max === 1
      ? item.options[component.id]
        ? 1
        : 0
      : _.sum(_.values(item.options[component.id]))

  function incrementOption(item, component, option) {
    dispatch({
      type: "INCREMENT_OPTION",
      itemId: item.id,
      componentId: component.id,
      optionId: option.id,
    })

    if (quantityOfOptionsSelected === component.max - 1) {
      setSearchText("")
      setTimeout(() => props.onDone(), 0)
    }
  }

  function renderOptionSummary(option) {
    return (
      <div>
        <div className="space-y-1">
          <h3 className="text-gray-900 text-sm font-medium">{option.name}</h3>
          {option.description && (
            <p className="text-gray-500 text-sm">{option.description}</p>
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
    )
  }

  return (
    <div>
      <div className="sticky z-10 top-0 px-6 py-5 bg-gray-50 border-b border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-gray-900 text-base font-medium">
            {component.name}
          </div>
          <div>{renderHint(component, quantityOfOptionsSelected)}</div>
        </div>
      </div>
      {component.options.length > 8 && (
        <div className="relative border-b border-gray-200">
          <SearchCircleIcon className="absolute left-6 top-1/2 w-6 h-6 text-gray-400 pointer-events-none transform -translate-y-1/2" />
          <input
            className="placeholder-gray-500 pl-14 pr-6 py-5 w-full text-gray-900 text-sm leading-none bg-white border-none focus:border-red-500 focus:outline-none focus:ring-red-500 focus:ring-2 focus:ring-inset"
            type="search"
            value={searchText}
            placeholder="Buscar"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault()
                incrementOption(item, component, options[0])
              } else if (e.key === "ArrowDown") {
                e.preventDefault()
                dispatch({
                  type: "DECREMENT_OPTION",
                  itemId: item.id,
                  componentId: component.id,
                  optionId: options[0].id,
                })
              }
            }}
          />
        </div>
      )}
      {options.length === 0 ? (
        <div className="px-6 py-5">
          <p className="text-gray-500 text-sm">Nenhum resultado encontrado</p>
        </div>
      ) : (
        <div>
          {component.max === 1 ? (
            <RadioGroup
              className="divide-gray-200 divide-y"
              value={item.options[component.id]}
              onChange={(value) => {
                dispatch({
                  type: "SELECT_OPTION",
                  itemId: item.id,
                  componentId: component.id,
                  optionId: value,
                })
                props.onDone()
              }}
            >
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.id}
                  value={option.id}
                  className={cn(
                    "px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 cursor-pointer"
                  )}
                >
                  {({ active, checked }) => (
                    <div className="flex items-center justify-between space-x-6">
                      {renderOptionSummary(option)}
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
            </RadioGroup>
          ) : (
            <div className="divide-gray-200 divide-y">
              {options.map((option) => {
                const optionCount = item.options[component.id]?.[option.id] ?? 0

                return (
                  <div
                    key={option.id}
                    className={cn(
                      "group text-left w-full px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
                    )}
                  >
                    <div className="flex items-center justify-between space-x-6">
                      {renderOptionSummary(option)}
                      <div className="flex-shrink-0">
                        <Toolbar
                          {...optionCountToolbarState}
                          className="flex items-center space-x-2.5"
                          aria-label="Quantidade"
                        >
                          <ToolbarItem
                            {...optionCountToolbarState}
                            as="button"
                            className={cn(
                              "rounded-full focus:outline-none focus:ring-red-500 focus:ring-2",
                              optionCount === 0 ? "opacity-25" : undefined
                            )}
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
                          <ToolbarItem
                            {...optionCountToolbarState}
                            as="button"
                            className={cn(
                              "rounded-full focus:outline-none focus:ring-red-500 focus:ring-2",
                              quantityOfOptionsSelected === component.max
                                ? "opacity-25"
                                : undefined
                            )}
                            onClick={() =>
                              incrementOption(item, component, option)
                            }
                          >
                            <PlusCircleIcon className="w-6 h-6 text-red-600" />
                          </ToolbarItem>
                        </Toolbar>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function HomeScreen() {
  const [open, setOpen] = React.useState(false)

  const newOrder = useNewOrder()

  React.useEffect(() => {
    newOrder.dispatch({
      type: "ADD_ITEM",
      product: products[1],
    })
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open
      </Button>
      <ItemModal
        item={newOrder.state.items[0]}
        dispatch={newOrder.dispatch}
        open={open}
        onClose={() => setOpen(false)}
      />
    </main>
  )
}

function ItemModal(props) {
  const itemCountToolbarState = useToolbarState({
    loop: true,
  })

  const commentsInputRef = React.useRef(null)

  const item = props.item

  // TODO
  if (!item) {
    return null
  }

  return (
    <Modal
      className={cn(
        "bg-white rounded-md shadow-lg",
        item.product.imageUrl ? "sm:max-w-[1200px]" : "sm:max-w-[600px]"
      )}
      open={props.open}
      onClose={props.onClose}
    >
      <div>
        <div className="max-h-[637px] flex">
          {item.product.imageUrl && (
            <div className="flex-1">
              <img
                className="w-full h-full object-cover"
                src={item.product.imageUrl}
                alt={item.product.name}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col">
            <Scroll.Element className="flex-1 overflow-auto" id="product">
              <div className="relative px-6 py-5">
                <button
                  className="absolute right-0 top-0 w-0 h-0 outline-none"
                  aria-hidden
                />
                <h1 className="text-gray-900 text-lg font-medium">
                  {item.product.name}
                </h1>
                <p className="mt-0.5 text-gray-500 text-sm">
                  {item.product.description}
                </p>
                <p className="flex items-baseline mt-3 space-x-2">
                  {item.product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.product.originalPrice)}
                    </span>
                  )}
                  <span className="text-green-600 text-base font-medium">
                    {item.product.minPrice > 0 && (
                      <span className="text-base font-normal">
                        A partir de{" "}
                      </span>
                    )}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.product.minPrice || item.product.price)}
                  </span>
                </p>
              </div>
              {item.product.components.map((component, componentIndex) => (
                <Scroll.Element key={component.id} name={component.name}>
                  <Option
                    component={component}
                    item={item}
                    dispatch={props.dispatch}
                    onDone={() => {
                      const nextComponent =
                        item.product.components[componentIndex + 1]?.name

                      if (nextComponent) {
                        Scroll.scroller.scrollTo(nextComponent, {
                          containerId: "product",
                          smooth: true,
                        })
                      } else {
                        Scroll.scroller.scrollTo("comments", {
                          containerId: "product",
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
                  {...itemCountToolbarState}
                  className="flex items-center space-x-4"
                  aria-label="Quantidade"
                >
                  <ToolbarItem
                    {...itemCountToolbarState}
                    as="button"
                    className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full focus:outline-none focus:ring-red-500 focus:ring-offset-2 focus:ring-2"
                    onClick={() => {
                      props.dispatch({
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
                    {...itemCountToolbarState}
                    as="button"
                    className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full focus:outline-none focus:ring-red-500 focus:ring-offset-2 focus:ring-2"
                    onClick={() => {
                      props.dispatch({
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
                    }).format(OrderItem.getTotal(item))}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
