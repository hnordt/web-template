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
import { Disclosure } from "@headlessui/react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import _ from "lodash/fp"

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

function Form(props) {
  const form = useForm({
    defaultValues: props.defaultValues,
  })

  return (
    <form noValidate onSubmit={form.handleSubmit(props.onSubmit)}>
      {props.children(form)}
    </form>
  )
}

function applyModifierToField(field, modifier) {
  const modifiedField = {
    ...field,
    ...modifier,
  }

  modifiedField.value = {
    ...modifiedField.value,
    value: normalizeFieldValue(modifiedField, modifiedField.value.value),
  }

  return modifiedField
}

function applyModifiersToFields(fields) {
  const currentValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.value.value,
    }),
    {}
  )

  const modifiers = fields.reduce(
    (acc, field) => ({
      ...acc,
      ...field.child.reduce(
        (acc, child) =>
          String(JSON.parse(child.condition).value) ===
          String(currentValues[field.id])
            ? {
                ...acc,
                [child.setting_definition_child]: _.omit(
                  ["condition", "setting_definition_child"],
                  child
                ),
              }
            : acc,
        {}
      ),
    }),
    {}
  )

  return fields.map((field) => applyModifierToField(field, modifiers[field.id]))
}

function getAppliableModifiersByField(field, value) {
  return field.child.filter(
    (child) => String(JSON.parse(child.condition).value) === String(value)
  )
}

function normalizeField(field) {
  return {
    ...field,
    value: {
      ...field.value,
      value: normalizeFieldValue(field, field.value.value),
    },
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
    child: field.child.map(normalizeModifier),
  }
}

function normalizeModifier(modifier) {
  return {
    ...modifier,
    value_lower:
      modifier.value_type === "key_value"
        ? Object.entries(modifier.value_lower).reduce(
            (acc, [k, v]) => ({
              ...acc,
              [k]: normalizeFieldValue(modifier, v),
            }),
            {}
          )
        : modifier.value_lower,
    default: normalizeFieldValue(modifier, modifier.default),
  }
}

function normalizeFieldValue(field, value) {
  if (field.value_type === "integer" || field.value_type === "float") {
    return Number(value)
  }

  if (field.value_type === "time") {
    return dayjs()
      .startOf("day")
      .add(enforceSeconds(value), "seconds")
      .format("HH:mm")
  }

  if (field.value_type === "duration") {
    return "0" // TODO
  }

  if (field.value_type === "boolean") {
    return Boolean(value)
  }

  return String(value)
}

function SettingsWidget() {
  const settings = data?.results ?? []

  let fields = settings
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
          // TODO
          // ...child.component.flatMap((component) =>
          //   component.setting.map((field) => ({
          //     ...field,
          //     meta: {
          //       settingId: setting.id,
          //       childId: child.id,
          //       componentId: component.component,
          //     },
          //   }))
          // ),
        ],
        []
      )
    )
    .map(normalizeField)

  fields = applyModifiersToFields(fields)

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

          const defaultValues = fields
            .filter((field) => field.meta.settingId === result.id)
            .reduce(
              (acc, field) => ({
                ...acc,
                [field.id]: field.value.value ?? field.default ?? "",
              }),
              {}
            )

          return (
            <li key={result.id}>
              <Form defaultValues={defaultValues} onSubmit={console.log}>
                {(form) => {
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
                                [child.setting_definition_child]: _.omit(
                                  ["condition", "setting_definition_child"],
                                  child
                                ),
                              }
                            : acc,
                        {}
                      ),
                    }),
                    {}
                  )

                  return (
                    <>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <div className="flex items-center">
                              <Disclosure.Button
                                className={cn(
                                  "group flex items-center px-6 py-5 w-full text-left focus:outline-none focus-visible:ring-blue-400 focus-visible:ring focus-visible:ring-inset",
                                  resultIndex === 0 && "rounded-t-md",
                                  resultIndex === settings.length - 1 &&
                                    "rounded-b-md"
                                )}
                              >
                                <div className="flex flex-1 items-center">
                                  <div className="flex-shrink-0">
                                    <div
                                      className={cn(
                                        "inline-flex items-center justify-center w-12 h-12 text-white bg-gradient-to-bl rounded-xl shadow-lg",
                                        open
                                          ? "from-blue-500 to-blue-700 group-hover:from-blue-600 group-hover:to-blue-800"
                                          : "from-gray-400 to-gray-500 group-hover:from-gray-500 group-hover:to-gray-600"
                                      )}
                                    >
                                      <Icon
                                        className="w-6 h-6 text-white"
                                        aria-hidden
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1 px-4">
                                    <p className="text-gray-900 text-base font-medium">
                                      {result.category}
                                    </p>
                                    <p className="mt-1 text-gray-500 text-sm">
                                      <span className="truncate">
                                        {result.description}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  {open ? (
                                    !form.formState.isDirty && (
                                      <ChevronDownIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden
                                      />
                                    )
                                  ) : (
                                    <ChevronRightIcon
                                      className="w-5 h-5 text-gray-400"
                                      aria-hidden
                                    />
                                  )}
                                </div>
                              </Disclosure.Button>
                              {open && form.formState.isDirty && (
                                <div className="flex mx-6 space-x-2">
                                  <Button
                                    variant="secondary"
                                    onClick={() => form.reset(defaultValues)}
                                  >
                                    Discard
                                  </Button>
                                  <Button type="submit">Save</Button>
                                </div>
                              )}
                            </div>
                            <Disclosure.Panel className="p-6 bg-gray-50 shadow-inner">
                              <div>
                                <div className="border-b border-gray-200">
                                  <div className="flex -mb-px space-x-8">
                                    {result.child.map((child) => (
                                      <div
                                        key={child.id}
                                        className={cn(
                                          false
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                          "px-1 pb-4 whitespace-nowrap text-sm font-medium border-b-2"
                                        )}
                                      >
                                        {child.category}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-6 text-gray-500 text-sm">
                                  {result.child.map((child) => (
                                    <div
                                      key={child.id}
                                      className="grid gap-8 grid-cols-4"
                                    >
                                      {child.setting.map((setting) => {
                                        let field = fields.find(
                                          (field) => field.id === setting.id
                                        )

                                        // TODO: remove
                                        if (!field) {
                                          return null
                                        }

                                        field = applyModifierToField(
                                          field,
                                          modifiers[field.id]
                                        )

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

                                        return (
                                          <div
                                            key={field.id}
                                            className={
                                              field.display === false
                                                ? "hidden"
                                                : undefined
                                            }
                                          >
                                            {(() => {
                                              switch (field.value_type) {
                                                case "string": {
                                                  return (
                                                    <Input
                                                      {...form.register(
                                                        String(field.id),
                                                        {
                                                          maxLength: {
                                                            value:
                                                              field.value_max,
                                                            message: `The maximum length for this field is ${field.value_max}`,
                                                          },
                                                          setValueAs: (v) =>
                                                            normalizeFieldValue(
                                                              field,
                                                              v
                                                            ),
                                                        }
                                                      )}
                                                      type="text"
                                                      label={field.label}
                                                      placeholder={
                                                        field.value_lower
                                                      }
                                                      error={
                                                        form.formState.errors?.[
                                                          field.id
                                                        ]?.message
                                                      }
                                                    />
                                                  )
                                                }

                                                case "integer": {
                                                  return (
                                                    <Input
                                                      {...form.register(
                                                        String(field.id),
                                                        {
                                                          min: {
                                                            value:
                                                              field.value_lower,
                                                            message: `The minimum value for this field is ${field.value_lower}`,
                                                          },
                                                          max: {
                                                            value:
                                                              field.value_upper,
                                                            message: `The maximum value for this field is ${field.value_upper}`,
                                                          },
                                                          validate: (v) =>
                                                            v &&
                                                            !isInt(String(v))
                                                              ? "Invalid value"
                                                              : true,
                                                          setValueAs: (v) =>
                                                            normalizeFieldValue(
                                                              field,
                                                              v
                                                            ),
                                                        }
                                                      )}
                                                      type="number"
                                                      label={field.label}
                                                      inlineTrailingAddon={
                                                        field.value_unit
                                                      }
                                                      min={field.value_lower}
                                                      max={field.value_upper}
                                                      info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                                                      error={
                                                        form.formState.errors?.[
                                                          field.id
                                                        ]?.message
                                                      }
                                                    />
                                                  )
                                                }

                                                case "float": {
                                                  return (
                                                    <Input
                                                      {...form.register(
                                                        String(field.id),
                                                        {
                                                          min: {
                                                            value:
                                                              field.value_lower,
                                                            message: `The minimum value for this field is ${field.value_lower}`,
                                                          },
                                                          max: {
                                                            value:
                                                              field.value_upper,
                                                            message: `The maximum value for this field is ${field.value_upper}`,
                                                          },
                                                          setValueAs: (v) =>
                                                            normalizeFieldValue(
                                                              field,
                                                              v
                                                            ),
                                                        }
                                                      )}
                                                      type="number"
                                                      label={field.label}
                                                      inlineTrailingAddon={
                                                        field.value_unit
                                                      }
                                                      min={field.value_lower}
                                                      max={field.value_upper}
                                                      step={0.1}
                                                      info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                                                      error={
                                                        form.formState.errors?.[
                                                          field.id
                                                        ]?.message
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
                                                  return (
                                                    <Input
                                                      {...form.register(
                                                        String(field.id),
                                                        {
                                                          setValueAs: (v) =>
                                                            normalizeFieldValue(
                                                              field,
                                                              v
                                                            ),
                                                        }
                                                      )}
                                                      type="text"
                                                      label={field.label}
                                                      error={
                                                        form.formState.errors?.[
                                                          field.id
                                                        ]?.message
                                                      }
                                                    />
                                                  )
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
                                                  return (
                                                    <Input
                                                      {...form.register(
                                                        String(field.id),
                                                        {
                                                          setValueAs: (v) =>
                                                            normalizeFieldValue(
                                                              field,
                                                              v
                                                            ),
                                                        }
                                                      )}
                                                      type="text"
                                                      label={field.label}
                                                      error={
                                                        form.formState.errors?.[
                                                          field.id
                                                        ]?.message
                                                      }
                                                    />
                                                  )
                                                }

                                                case "list": {
                                                  return (
                                                    <Controller
                                                      control={form.control}
                                                      name={String(field.id)}
                                                      rules={{
                                                        setValueAs: (v) =>
                                                          normalizeFieldValue(
                                                            field,
                                                            v
                                                          ),
                                                      }}
                                                      render={(props) => (
                                                        <Select
                                                          ref={props.field.ref}
                                                          label={field.label}
                                                          options={field.value_lower
                                                            .split(",")
                                                            .map((value) => ({
                                                              label: value,
                                                              value,
                                                            }))}
                                                          value={
                                                            props.field.value
                                                          }
                                                          onChange={
                                                            props.field.onChange
                                                          }
                                                        />
                                                      )}
                                                    />
                                                  )
                                                }

                                                case "key_value": {
                                                  return (
                                                    <Controller
                                                      control={form.control}
                                                      name={String(field.id)}
                                                      rules={{
                                                        setValueAs: (v) =>
                                                          normalizeFieldValue(
                                                            field,
                                                            v
                                                          ),
                                                      }}
                                                      render={(props) => (
                                                        <Select
                                                          ref={props.field.ref}
                                                          label={field.label}
                                                          options={Object.entries(
                                                            field.value_lower
                                                          ).map(
                                                            ([
                                                              label,
                                                              value,
                                                            ]) => ({
                                                              label,
                                                              value,
                                                            })
                                                          )}
                                                          value={
                                                            props.field.value
                                                          }
                                                          onChange={(value) => {
                                                            props.field.onChange(
                                                              value
                                                            )

                                                            getAppliableModifiersByField(
                                                              field,
                                                              value
                                                            ).forEach(
                                                              (modifier) =>
                                                                form.setValue(
                                                                  String(
                                                                    modifier.setting_definition_child
                                                                  ),
                                                                  modifier.default
                                                                )
                                                            )
                                                          }}
                                                        />
                                                      )}
                                                    />
                                                  )
                                                }

                                                case "boolean": {
                                                  return (
                                                    <Controller
                                                      control={form.control}
                                                      name={String(field.id)}
                                                      rules={{
                                                        setValueAs: (v) =>
                                                          normalizeFieldValue(
                                                            field,
                                                            v
                                                          ),
                                                      }}
                                                      render={(props) => (
                                                        <Switch
                                                          ref={props.field.ref}
                                                          label={field.label}
                                                          value={
                                                            props.field.value
                                                          }
                                                          onChange={
                                                            props.field.onChange
                                                          }
                                                        />
                                                      )}
                                                    />
                                                  )
                                                }

                                                default: {
                                                  return "Unknown field" // TODO
                                                }
                                              }
                                            })()}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </>
                  )
                }}
              </Form>
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
