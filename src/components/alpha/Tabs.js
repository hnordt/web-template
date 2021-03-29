import React from "react"
import {
  TabList as BaseTabList,
  Tab as BaseTab,
  TabPanel as BaseTabPanel,
  useTabState,
} from "reakit"
import cn from "classnames"

const TabsContext = React.createContext()

export default function Tabs(props) {
  const tabState = useTabState({
    orientation: props.orientation,
  })

  return (
    <TabsContext.Provider
      value={{
        tabState,
        unmount: props.unmount,
      }}
    >
      {props.children}
    </TabsContext.Provider>
  )
}

export function TabList(props) {
  const tabs = React.useContext(TabsContext)

  return (
    <BaseTabList
      {...tabs.tabState}
      className={
        tabs.tabState.orientation === "vertical"
          ? "space-y-1"
          : "flex space-x-4"
      }
      aria-label={props["aria-label"]}
    >
      {props.children}
    </BaseTabList>
  )
}

export function Tab(props) {
  const tabs = React.useContext(TabsContext)

  return (
    <BaseTab
      {...tabs.tabState}
      className={
        tabs.tabState.orientation === "vertical"
          ? cn(
              "group flex items-center px-3 py-2 w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring",
              props.id === tabs.tabState.selectedId
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )
          : cn(
              "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring",
              props.id === tabs.tabState.selectedId
                ? "text-gray-700 bg-gray-100"
                : "group text-gray-500 hover:text-gray-700"
            )
      }
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon &&
        React.createElement(props.icon, {
          className:
            tabs.tabState.orientation === "vertical"
              ? cn(
                  "flex-shrink-0 -ml-1 mr-3 w-6 h-6",
                  props.id === tabs.tabState.selectedId
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                )
              : cn(
                  "flex-shrink-0 mr-2 w-5 h-5",
                  props.id === tabs.tabState.selectedId
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                ),
        })}
      <span
        className={cn(
          "flex-1",
          tabs.tabState.orientation === "vertical" ? "truncate" : undefined
        )}
      >
        {props.children}
      </span>
    </BaseTab>
  )
}

export function TabPanel(props) {
  const tabs = React.useContext(TabsContext)

  return (
    <BaseTabPanel
      {...tabs.tabState}
      className="focus:outline-none focus-visible:ring"
    >
      {tabs.unmount
        ? props.tabId === tabs.tabState.selectedId && props.children
        : props.children}
    </BaseTabPanel>
  )
}
