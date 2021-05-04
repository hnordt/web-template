import React from "react"
import { Controller, useForm } from "react-hook-form"
import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  CursorClickIcon,
  DocumentReportIcon,
} from "@heroicons/react/solid"
import Input from "components/core/alpha/Input"
import Button from "components/core/alpha/Button"
import cn from "classnames"
import data from "data/settings"
import isInt from "validator/lib/isInt"
import Select from "components/core/alpha/Select"
import Switch from "components/core/alpha/Switch"
import dayjs from "dayjs"

function enforceSeconds(value) {
  if (typeof value === "string" && value.includes(":")) {
    const [h, m] = value.split(":")

    return h * 3600 + m * 60
  }

  if (typeof value !== "number") {
    return Number(value)
  }

  return value
}

function SettingsWidget() {
  const [openId, setOpenId] = React.useState(null)

  const settings = data?.results ?? []

  const fields = settings
    .flatMap((setting) =>
      setting.child.reduce(
        (acc, child) => [
          ...acc,
          ...child.setting.map((field) => ({
            ...field,
            meta: {
              settingId: setting.id,
              childId: child.id,
            },
          })),
          ...child.component.flatMap((component) =>
            component.setting.map((field) => ({
              ...field,
              meta: {
                settingId: setting.id,
                childId: child.id,
                componentId: component.component,
              },
            }))
          ),
        ],
        []
      )
    )
    .map(normalizeField)

  const defaultValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.value.value || field.default || "",
    }),
    {}
  )

  const form = useForm({
    defaultValues,
  })

  const currentValues = form.watch()

  const modifiers = fields.reduce(
    (acc, field) => ({
      ...acc,
      ...field.child.reduce(
        (acc, child) =>
          String(JSON.parse(child.condition).value) ===
          String(currentValues[field.id])
            ? {
                ...acc,
                [child.setting_definition_child]: child,
              }
            : acc,
        {}
      ),
    }),
    {}
  )

  function getAppliableModifiersByField(field, value) {
    return field.child.filter(
      (child) => String(JSON.parse(child.condition).value) === String(value)
    )
  }

  function normalizeField(field) {
    return {
      ...field,
      value: field.value
        ? {
            ...field.value,
            value: normalizeFieldValue(field, field.value.value),
          }
        : undefined,
      value_lower:
        field.value_type === "key_value"
          ? Object.entries(field.value_lower).reduce(
              (acc, [k, v]) => ({
                ...acc,
                [k]: normalizeFieldValue(field, v),
              }),
              {}
            )
          : field.value_lower,
      default: normalizeFieldValue(field, field.default),
      child: field.child?.map(normalizeField) ?? undefined,
    }
  }

  function normalizeFieldValue(field, value) {
    if (field.value_type === "time") {
      return dayjs()
        .startOf("day")
        .add(enforceSeconds(value), "seconds")
        .format("HH:mm")
    }

    return String(value)
  }

  return (
    <div className="bg-white rounded-md shadow">
      <ul className="divide-gray-200 divide-y">
        {settings.map((result, resultIndex) => {
          const Icon = {
            "Settings": CogIcon,
            "Alarms": BellIcon,
            "Water Usage": DocumentReportIcon,
            "Event History": CalendarIcon,
            "Actions": CursorClickIcon,
          }[result.category]

          return (
            <li key={result.id}>
              <button
                className={cn(
                  "group flex items-center px-6 py-5 w-full text-left focus:outline-none focus-visible:ring-blue-400 focus-visible:ring focus-visible:ring-inset",
                  resultIndex === 0 && "rounded-t-md",
                  resultIndex === settings.length - 1 && "rounded-b-md"
                )}
                type="button"
                onClick={() =>
                  setOpenId(result.id === openId ? null : result.id)
                }
              >
                <div className="flex flex-1 items-center">
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-12 h-12 text-white bg-gradient-to-bl rounded-xl shadow-lg",
                        result.id === openId
                          ? "from-blue-500 to-blue-700 group-hover:from-blue-600 group-hover:to-blue-800"
                          : "from-gray-400 to-gray-500 group-hover:from-gray-500 group-hover:to-gray-600"
                      )}
                    >
                      <Icon className="w-6 h-6 text-white" aria-hidden />
                    </div>
                  </div>
                  <div className="flex-1 px-4">
                    <p className="text-gray-900 text-base font-medium">
                      {result.category}
                    </p>
                    <p className="mt-1 text-gray-500 text-sm">
                      <span className="truncate">{result.description}</span>
                    </p>
                  </div>
                </div>
                <div>
                  {result.id === openId ? (
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden
                    />
                  ) : (
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden
                    />
                  )}
                </div>
              </button>
              {result.id === openId && (
                <div className="p-6 bg-gray-50 shadow-inner">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                      {result?.child.map((child, i) => (
                        <a
                          key={child.id}
                          href="#todo"
                          className={cn(
                            i === 0
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "px-1 pb-4 whitespace-nowrap text-sm font-medium border-b-2"
                          )}
                        >
                          {child.category}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-6 text-gray-500 text-sm">
                    <form noValidate onSubmit={form.handleSubmit(console.log)}>
                      <div className="grid gap-8 grid-cols-4">
                        {result?.child[0].setting.map((setting) => {
                          const field = {
                            ...fields.find((field) => field.id === setting.id),
                            ...modifiers[setting.id],
                          }

                          if (field.display === false) {
                            return null
                          }

                          // TODO: changes
                          // props.form.formState.dirtyFields[props.config.id] ? (
                          //   <div className="flex items-center space-x-2">
                          //     <span className="relative inline-flex items-center px-2.5 py-0.5 text-red-800 line-through text-sm font-medium bg-red-100 rounded-md">
                          //       {props.config.value_type === "key_value" ? (
                          //         _.invert(props.config.value_lower)[
                          //           props.defaultValues[props.config.id]
                          //         ] ?? "N/D"
                          //       ) : props.config.value_type === "boolean" ? (
                          //         <>
                          //           {props.defaultValues[props.config.id] ? (
                          //             <RiCheckboxLine className="w-4 h-4" />
                          //           ) : (
                          //             <RiCheckboxBlankLine className="w-4 h-4" />
                          //           )}
                          //           <span className="absolute left-2 right-2 top-1/2 h-px bg-red-800" />
                          //         </>
                          //       ) : (
                          //         props.defaultValues[props.config.id] ?? "N/D"
                          //       )}
                          //     </span>
                          //     <RiArrowRightLine className="w-4 h-4 text-gray-500" />
                          //     <span className="inline-flex items-center px-2.5 py-0.5 text-green-800 text-sm font-medium bg-green-100 rounded-md">
                          //       {props.config.value_type === "key_value" ? (
                          //         _.invert(props.config.value_lower)[
                          //           props.currentValues[props.config.id]
                          //         ] ?? "N/D"
                          //       ) : props.config.value_type === "boolean" ? (
                          //         props.currentValues[props.config.id] ? (
                          //           <RiCheckboxLine className="w-4 h-4" />
                          //         ) : (
                          //           <RiCheckboxBlankLine className="w-4 h-4" />
                          //         )
                          //       ) : (
                          //         props.currentValues[props.config.id] ?? "N/D"
                          //       )}
                          //     </span>
                          //   </div>
                          // ) : null

                          switch (field.value_type) {
                            case "string": {
                              return (
                                <Input
                                  {...form.register(String(field.id), {
                                    maxLength: {
                                      value: field.value_max,
                                      message: `The maximum length for this field is ${field.value_max}`,
                                    },
                                  })}
                                  key={field.id}
                                  type="text"
                                  label={field.label}
                                  placeholder={field.value_lower}
                                  error={
                                    form.formState.errors?.[field.id]?.message
                                  }
                                />
                              )
                            }

                            case "integer": {
                              return (
                                <Input
                                  {...form.register(String(field.id), {
                                    min: {
                                      value: field.value_lower,
                                      message: `The minimum value for this field is ${field.value_lower}`,
                                    },
                                    max: {
                                      value: field.value_upper,
                                      message: `The maximum value for this field is ${field.value_upper}`,
                                    },
                                    validate: (v) =>
                                      v && !isInt(String(v))
                                        ? "Invalid value"
                                        : true,
                                    valueAsNumber: true,
                                  })}
                                  key={field.id}
                                  type="number"
                                  label={field.label}
                                  inlineTrailingAddon={field.value_unit}
                                  min={field.value_lower}
                                  max={field.value_upper}
                                  info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                                  error={
                                    form.formState.errors?.[field.id]?.message
                                  }
                                />
                              )
                            }

                            case "float": {
                              return (
                                <Input
                                  {...form.register(String(field.id), {
                                    min: {
                                      value: field.value_lower,
                                      message: `The minimum value for this field is ${field.value_lower}`,
                                    },
                                    max: {
                                      value: field.value_upper,
                                      message: `The maximum value for this field is ${field.value_upper}`,
                                    },
                                    valueAsNumber: true,
                                  })}
                                  key={field.id}
                                  type="number"
                                  label={field.label}
                                  inlineTrailingAddon={field.value_unit}
                                  step={0.1}
                                  min={field.value_lower}
                                  max={field.value_upper}
                                  info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                                  error={
                                    form.formState.errors?.[field.id]?.message
                                  }
                                />
                              )
                            }

                            // TODO
                            case "time": {
                              // <Input
                              //   {...props.form.register(
                              //     String(props.config.id),
                              //     {
                              //       required: "This field is required",
                              //     }
                              //   )}
                              //   id={props.config.id}
                              //   type="time"
                              //   min={dayjs()
                              //     .startOf("day")
                              //     .add(
                              //       enforceSeconds(props.config.value_lower),
                              //       "seconds"
                              //     )
                              //     .format("HH:mm")}
                              //   max={dayjs()
                              //     .startOf("day")
                              //     .add(
                              //       enforceSeconds(props.config.value_upper),
                              //       "seconds"
                              //     )
                              //     .format("HH:mm")}
                              // />
                              return "Time"
                            }

                            // TODO
                            case "duration": {
                              // <Controller
                              //   control={props.form.control}
                              //   name={String(props.config.id)}
                              //   rules={{
                              //     required: "This field is required",
                              //   }}
                              //   render={(props) => (
                              //     <DurationInput
                              //       {...props.field}
                              //       onValueChange={props.field.onChange}
                              //     />
                              //   )}
                              // />
                              return "Duration"
                            }

                            case "list": {
                              return (
                                <Controller
                                  key={field.id}
                                  control={form.control}
                                  name={String(field.id)}
                                  render={(props) => (
                                    <Select
                                      label={field.label}
                                      options={field.value_lower
                                        .split(",")
                                        .map((value) => ({
                                          label: value,
                                          value,
                                        }))}
                                      value={props.field.value}
                                      onChange={props.field.onChange}
                                    />
                                  )}
                                />
                              )
                            }

                            case "key_value": {
                              return (
                                <Controller
                                  key={field.id}
                                  control={form.control}
                                  name={String(field.id)}
                                  render={(props) => (
                                    <Select
                                      label={field.label}
                                      options={Object.entries(
                                        field.value_lower
                                      ).map(([label, value]) => ({
                                        label,
                                        value,
                                      }))}
                                      value={props.field.value}
                                      onChange={(value) => {
                                        props.field.onChange(value)

                                        getAppliableModifiersByField(
                                          field,
                                          value
                                        ).forEach((modifier) => {
                                          form.setValue(
                                            String(
                                              modifier.setting_definition_child
                                            ),
                                            modifier.default
                                          )
                                          console.log(modifier)
                                        })
                                      }}
                                    />
                                  )}
                                />
                              )
                            }

                            case "boolean": {
                              return (
                                <Controller
                                  key={field.id}
                                  control={form.control}
                                  name={String(field.id)}
                                  render={(props) => (
                                    <Switch
                                      label={field.label}
                                      value={props.field.value}
                                      onChange={props.field.onChange}
                                    />
                                  )}
                                />
                              )
                            }

                            default: {
                              return "Unknown field" // TODO
                            }
                          }
                        })}
                      </div>
                      <div className="flex justify-end mt-8 pt-8 border-t border-gray-200 space-x-2">
                        <Button type="submit">Save changes</Button>
                        <Button
                          variant="secondary"
                          onClick={() => form.reset()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function HomeScreen() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-6xl">
        <SettingsWidget />
      </div>
    </main>
  )
}
