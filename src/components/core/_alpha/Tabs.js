import React from "react"
import {
  Tabs as BaseTabs,
  TabList as BaseTabList,
  Tab as BaseTab,
  TabPanels,
  TabPanel as BaseTabPanel,
} from "@reach/tabs"
import cn from "classnames"

const OrientationContext = React.createContext()

export default function Tabs(props) {
  return (
    <OrientationContext.Provider value={props.orientation}>
      <BaseTabs {...props} />
    </OrientationContext.Provider>
  )
}

export function TabList(props) {
  const orientation = React.useContext(OrientationContext)

  return (
    <BaseTabList
      className={orientation === "vertical" ? "space-y-1" : "flex space-x-4"}
    >
      {props.children}
    </BaseTabList>
  )
}

export function Tab(props) {
  const orientation = React.useContext(OrientationContext)

  return (
    <BaseTab
      className={
        orientation === "vertical"
          ? cn(
              "group flex items-center px-3 py-2 w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring",
              props.isSelected
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )
          : cn(
              "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring",
              props.isSelected
                ? "text-gray-700 bg-gray-100"
                : "group text-gray-500 hover:text-gray-700"
            )
      }
      disabled={props.disabled}
    >
      {props.icon &&
        React.createElement(props.icon, {
          className:
            orientation === "vertical"
              ? cn(
                  "flex-shrink-0 -ml-1 mr-3 w-6 h-6",
                  props.isSelected
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                )
              : cn(
                  "flex-shrink-0 mr-2 w-5 h-5",
                  props.isSelected
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                ),
        })}
      <span
        className={cn(
          "flex-1",
          orientation === "vertical" ? "text-left truncate" : undefined
        )}
      >
        {props.children}
      </span>
    </BaseTab>
  )
}

export { TabPanels }

export function TabPanel(props) {
  return (
    <BaseTabPanel className="focus:outline-none focus-visible:ring">
      {props.children}
    </BaseTabPanel>
  )
}
