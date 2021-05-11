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
  SaveIcon,
} from "@heroicons/react/solid"
import Input, { DurationInput } from "components/core/alpha/Input"
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
import { Popover, Transition } from "@headlessui/react"
import toast from "react-hot-toast"
import BiocideTimer from "components/BiocideTimer"

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

// TODO: remove
function Form(props) {
  const form = useForm({
    defaultValues: props.defaultValues,
  })

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(
        (...args) => props.onSubmit?.(...args, form),
        (...args) => props.onError?.(...args, form)
      )}
    >
      {props.children(form)}
    </form>
  )
}

function applyModifierToField(field, modifiers, currentValues) {
  const _modifier = modifiers.find(
    (modifier) =>
      modifier._condition.applyTo === field.id &&
      String(currentValues[modifier._condition.fieldId]) ===
        String(modifier._condition.value)
  )

  if (_modifier) {
    return {
      ...field,
      ..._modifier,
    }
  }

  return field
}

function getAppliableModifiersByField(modifiers, field, value) {
  return modifiers.filter(
    (modifier) =>
      modifier._condition.fieldId === field.id &&
      modifier._condition.value === value
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

  if (field.value_type === "boolean") {
    return Boolean(value)
  }

  return String(value)
}

function SettingsWidget() {
  const [tabIndexes, setTabIndexes] = React.useState({})

  const settings = data?.results ?? []

  let fields = settings
    .flatMap((setting) =>
      setting.child.reduce(
        (acc, child, childIndex) => [
          ...acc,
          ...child.setting.map((field) => ({
            ...field,
            meta: {
              settingId: setting.id,
              childId: child.id,
              childIndex: childIndex,
            },
          })),
          ...child.component.flatMap((component) =>
            component.setting.map((field) => ({
              ...field,
              meta: {
                settingId: setting.id,
                childId: child.id,
                childIndex: childIndex,
                component: component.component,
              },
            }))
          ),
        ],
        []
      )
    )
    .map(normalizeField)

  const modifiers = fields.reduce(
    (acc, field) => [
      ...acc,
      ...field.child.reduce((acc, child) => {
        const condition = JSON.parse(child.condition)

        return [
          ...acc,
          {
            ...child,
            default: normalizeFieldValue(child, child.default),
            _condition: {
              fieldId: field.id,
              value: normalizeFieldValue(
                field,
                condition.key
                  ? field.value_lower[condition.key]
                  : condition.value
              ),
              applyTo: child.setting_definition_child,
            },
          },
        ]
      }, []),
    ],
    []
  )

  // [FIXME] to be able to apply modifiers we need to get the current values from the api
  // the problem is that the api will not return the value typed according to the
  // modifier, instead, it'll return the value typed according to the default field type
  // for example Control Cycle Time is of type list, but when Control Method is 0,
  // Control Cycle Time is of type integer, but still the api will return "45" (list)
  // and not 45 (integer)
  // so to be able to apply modifiers we'll need to force all values to be String
  // this is probably gonna cause issues, so we need to return the correct field type
  // when calculating the var fields
  // probably we need to apply the modifier while creating the field, so we can
  // force it to return the correct value type
  const unsafeValueTypeDefaultValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.value.value,
    }),
    {}
  )

  fields = fields.map((field) =>
    applyModifierToField(field, modifiers, unsafeValueTypeDefaultValues)
  )

  // we can only calculate defaultValues after applying all modifiers
  const defaultValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: normalizeFieldValue(field, field.value.value),
    }),
    {}
  )

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(values, _, form) => {
        form.reset(values)
        toast.success("Settings saved successfully!")
      }}
      onError={(errors) => {
        const firstInvalidField = fields.find(
          (field) => String(field.id) === Object.keys(errors)[0]
        )

        setTabIndexes({
          ...tabIndexes,
          [firstInvalidField.meta.settingId]: firstInvalidField.meta.childIndex,
        })
      }}
    >
      {(form) => {
        const changeCount = Object.keys(form.formState.dirtyFields).length

        const currentValues = form.watch()

        return (
          <>
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
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <div className="flex items-center">
                              <Disclosure.Button
                                className={cn(
                                  "group flex items-center px-6 py-5 w-full text-left focus:outline-none focus-visible:ring-blue-400 focus-visible:ring focus-visible:ring-inset",
                                  resultIndex === 0 && "rounded-t-md",
                                  resultIndex === settings.length - 1 &&
                                    !form.formState.isDirty &&
                                    "rounded-b-md"
                                )}
                              >
                                <div className="flex flex-1 items-center">
                                  <div className="flex-shrink-0">
                                    <div
                                      className={cn(
                                        "relative inline-flex items-center justify-center w-12 h-12 text-white bg-gradient-to-bl rounded-xl shadow-lg",
                                        open
                                          ? "from-blue-500 to-blue-700 group-hover:from-blue-600 group-hover:to-blue-800"
                                          : "from-gray-400 to-gray-500 group-hover:from-gray-500 group-hover:to-gray-600"
                                      )}
                                    >
                                      <Icon
                                        className="w-6 h-6 text-white"
                                        aria-hidden
                                      />
                                      {fields.some(
                                        (field) =>
                                          field.meta.settingId === result.id &&
                                          form.formState.dirtyFields[field.id]
                                      ) && (
                                        <span className="absolute -right-0.5 -top-0.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                                      )}
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
                              </Disclosure.Button>
                            </div>
                            <Disclosure.Panel
                              className={cn(
                                "p-6 bg-gray-50 shadow-inner",
                                resultIndex === settings.length - 1 &&
                                  !form.formState.isDirty &&
                                  "rounded-b-md"
                              )}
                              unmount={false}
                            >
                              <Tabs
                                index={tabIndexes[result.id] ?? 0}
                                onChange={(index) =>
                                  setTabIndexes({
                                    ...tabIndexes,
                                    [result.id]: index,
                                  })
                                }
                              >
                                {({ selectedIndex }) => (
                                  <>
                                    <TabList>
                                      <div className="border-b border-gray-200">
                                        <div className="flex -mb-px space-x-8">
                                          {result.child.map(
                                            (child, childIndex) => (
                                              <Tab
                                                key={child.id}
                                                className={cn(
                                                  "px-1 pb-4 whitespace-nowrap text-sm font-medium border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                                  childIndex === selectedIndex
                                                    ? "border-blue-500 text-blue-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                )}
                                              >
                                                <span className="inline-flex items-center space-x-2">
                                                  <span>{child.category}</span>
                                                  {fields.some(
                                                    (field) =>
                                                      field.meta.settingId ===
                                                        result.id &&
                                                      field.meta.childId ===
                                                        child.id &&
                                                      form.formState
                                                        .dirtyFields[field.id]
                                                  ) && (
                                                    <span className="relative">
                                                      <SaveIcon className="w-4 h-4 text-blue-500" />
                                                      <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                    </span>
                                                  )}
                                                </span>
                                              </Tab>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </TabList>
                                    <TabPanels>
                                      <div className="mt-6 text-gray-500 text-sm">
                                        {result.child.map((child) => (
                                          <TabPanel key={child.id}>
                                            <div className="grid gap-8 grid-cols-4">
                                              {_.orderBy("order", "asc", fields)
                                                .filter(
                                                  (field) =>
                                                    field.meta.settingId ===
                                                      result.id &&
                                                    field.meta.childId ===
                                                      child.id &&
                                                    !field.meta.component
                                                )
                                                .map((field) => {
                                                  // TODO: avoid mutation
                                                  field = applyModifierToField(
                                                    field,
                                                    modifiers,
                                                    currentValues
                                                  )

                                                  return (
                                                    <div
                                                      key={field.id}
                                                      className={cn(
                                                        field.span === 2 &&
                                                          "col-span-2",
                                                        field.span === 3 &&
                                                          "col-span-3",
                                                        field.span === 4 &&
                                                          "col-span-4",
                                                        field.display ===
                                                          false && "hidden"
                                                      )}
                                                    >
                                                      {renderField(
                                                        field,
                                                        form,
                                                        defaultValues,
                                                        modifiers
                                                      )}
                                                    </div>
                                                  )
                                                })}
                                              <div className="col-span-4">
                                                <div className="relative">
                                                  <div
                                                    className="absolute inset-0 flex items-center"
                                                    aria-hidden="true"
                                                  >
                                                    <div className="w-full border-t border-gray-300" />
                                                  </div>
                                                  <div className="relative flex justify-start">
                                                    <span className="pr-2 text-gray-500 text-sm bg-gray-50">
                                                      Components
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              {child.component.map(
                                                (component, componentIndex) => (
                                                  <div
                                                    key={component.component}
                                                  >
                                                    {component.component_type ===
                                                    "biocide_timer" ? (
                                                      <BiocideTimer
                                                        number={
                                                          componentIndex + 1
                                                        }
                                                      />
                                                    ) : null}
                                                    {/* <Popover className="relative">
                                                      {({ open }) => (
                                                        <>
                                                          <div className="bottom-[1px] relative mt-6">
                                                            <Popover.Button className="inline-flex justify-center px-4 py-2 w-full text-gray-700 text-smhover:bg-gray-50 bg-white border border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-2">
                                                              <span className="inline-flex items-center space-x-2">
                                                                <span>
                                                                  {
                                                                    component.component
                                                                  }
                                                                </span>
                                                                {fields.some(
                                                                  (field) =>
                                                                    field.meta
                                                                      .settingId ===
                                                                      result.id &&
                                                                    field.meta
                                                                      .childId ===
                                                                      child.id &&
                                                                    field.meta
                                                                      .component ===
                                                                      component.component &&
                                                                    form
                                                                      .formState
                                                                      .dirtyFields[
                                                                      field.id
                                                                    ]
                                                                ) && (
                                                                  <span className="relative">
                                                                    <SaveIcon className="w-4 h-4 text-blue-500" />
                                                                    <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                                  </span>
                                                                )}
                                                              </span>
                                                              <ChevronDownIcon
                                                                className={`${
                                                                  open
                                                                    ? ""
                                                                    : "text-opacity-70"
                                                                }
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                                                aria-hidden
                                                              />
                                                            </Popover.Button>
                                                          </div>
                                                          <Transition
                                                            as={React.Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0 translate-y-1"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 translate-y-1"
                                                            show={open}
                                                            unmount={false}
                                                          >
                                                            <Popover.Panel
                                                              className="absolute z-10 left-1/2 mt-3 px-4 w-screen max-w-sm transform -translate-x-1/2 sm:px-0 lg:max-w-3xl"
                                                              unmount={false}
                                                            >
                                                              <div className="rounded-lg shadow-lg overflow-hidden ring-black ring-opacity-5 ring-1">
                                                                <div className="relative grid gap-8 grid-cols-4 p-7 bg-white">
                                                                  {_.orderBy(
                                                                    "order",
                                                                    "asc",
                                                                    fields
                                                                  )
                                                                    .filter(
                                                                      (field) =>
                                                                        field
                                                                          .meta
                                                                          .settingId ===
                                                                          result.id &&
                                                                        field
                                                                          .meta
                                                                          .childId ===
                                                                          child.id &&
                                                                        field
                                                                          .meta
                                                                          .component ===
                                                                          component.component
                                                                    )
                                                                    .map(
                                                                      (
                                                                        field
                                                                      ) => {
                                                                        // TODO: avoid mutation
                                                                        field = applyModifierToField(
                                                                          field,
                                                                          modifiers,
                                                                          currentValues
                                                                        )

                                                                        return (
                                                                          <div
                                                                            key={
                                                                              field.id
                                                                            }
                                                                            className={cn(
                                                                              field.span ===
                                                                                2 &&
                                                                                "col-span-2",
                                                                              field.span ===
                                                                                3 &&
                                                                                "col-span-3",
                                                                              field.span ===
                                                                                4 &&
                                                                                "col-span-4",
                                                                              field.display ===
                                                                                false &&
                                                                                "hidden"
                                                                            )}
                                                                          >
                                                                            {renderField(
                                                                              field,
                                                                              form,
                                                                              defaultValues,
                                                                              modifiers
                                                                            )}
                                                                          </div>
                                                                        )
                                                                      }
                                                                    )}
                                                                </div>
                                                              </div>
                                                            </Popover.Panel>
                                                          </Transition>
                                                        </>
                                                      )}
                                                    </Popover> */}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </TabPanel>
                                        ))}
                                      </div>
                                    </TabPanels>
                                  </>
                                )}
                              </Tabs>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </li>
                  )
                })}
                {form.formState.isDirty && (
                  <li>
                    <div className="flex items-center justify-between px-6 py-5 rounded-b-md">
                      <p className="text-gray-900 text-sm">
                        You have made{" "}
                        <strong className="font-medium">
                          {changeCount}{" "}
                          {changeCount === 1 ? "change" : "changes"}
                        </strong>
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          onClick={() => form.reset()}
                        >
                          Discard
                        </Button>
                        <Button type="submit">Save changes</Button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </>
        )
      }}
    </Form>
  )
}

export default function HomeScreen() {
  return (
    <main className="flex justify-center py-8 min-h-screen bg-gray-200">
      <div className="w-full max-w-6xl">
        <SettingsWidget />
      </div>
    </main>
  )
}

function renderField(field, form, defaultValues, modifiers) {
  return (
    <div className="relative">
      {form.formState.dirtyFields[field.id] && (
        <button
          className="absolute right-0 top-0"
          type="button"
          onClick={() =>
            form.setValue(String(field.id), defaultValues[field.id], {
              shouldDirty: true,
            })
          }
        >
          <span className="relative text-red-600 line-through text-sm font-medium">
            {field.value_type === "key_value"
              ? _.invert(field.value_lower)[defaultValues[field.id]] ?? "N/D"
              : field.value_type === "boolean"
              ? defaultValues[field.id]
                ? "On"
                : "Off"
              : defaultValues[field.id] ?? "N/D"}
          </span>
        </button>
      )}
      {(() => {
        switch (field.value_type) {
          case "string": {
            return (
              <Input
                {...form.register(String(field.id), {
                  maxLength: {
                    value: field.value_max,
                    message: `The maximum length for this field is ${field.value_max}`,
                  },
                  setValueAs: (v) => normalizeFieldValue(field, v),
                })}
                type="text"
                label={field.label}
                placeholder={field.value_lower}
                error={form.formState.errors?.[field.id]?.message}
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
                    v && !isInt(String(v)) ? "Invalid value" : true,
                  setValueAs: (v) => normalizeFieldValue(field, v),
                })}
                type="number"
                label={field.label}
                inlineTrailingAddon={field.value_unit}
                min={field.value_lower}
                max={field.value_upper}
                info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                error={form.formState.errors?.[field.id]?.message}
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
                  setValueAs: (v) => normalizeFieldValue(field, v),
                })}
                type="number"
                label={field.label}
                inlineTrailingAddon={field.value_unit}
                min={field.value_lower}
                max={field.value_upper}
                step={0.1}
                info={`${field.value_lower}-${field.value_upper} ${field.value_unit}`}
                error={form.formState.errors?.[field.id]?.message}
              />
            )
          }

          case "time": {
            return (
              <Input
                {...form.register(String(field.id), {
                  setValueAs: (v) => normalizeFieldValue(field, v),
                })}
                type="time"
                label={field.label}
                min={dayjs()
                  .startOf("day")
                  .add(enforceSeconds(field.value_lower), "seconds")
                  .format("HH:mm")}
                max={dayjs()
                  .startOf("day")
                  .add(enforceSeconds(field.value_upper), "seconds")
                  .format("HH:mm")}
                error={form.formState.errors?.[field.id]?.message}
              />
            )
          }

          // TODO
          case "duration": {
            return (
              <Controller
                control={form.control}
                name={String(field.id)}
                rules={{
                  setValueAs: (v) => normalizeFieldValue(field, v),
                }}
                render={(props) => (
                  <DurationInput
                    ref={props.field.ref}
                    label={field.label}
                    value={props.field.value}
                    onValueChange={props.field.onChange}
                  />
                )}
              />
            )
          }

          case "list": {
            return (
              <Controller
                control={form.control}
                name={String(field.id)}
                rules={{
                  setValueAs: (v) => normalizeFieldValue(field, v),
                }}
                render={(props) => (
                  <Select
                    ref={props.field.ref}
                    label={field.label}
                    options={field.value_lower.split(",").map((value) => ({
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
                control={form.control}
                name={String(field.id)}
                rules={{
                  setValueAs: (v) => normalizeFieldValue(field, v),
                }}
                render={(props) => (
                  <Select
                    ref={props.field.ref}
                    label={field.label}
                    options={Object.entries(field.value_lower).map(
                      ([label, value]) => ({
                        label,
                        value,
                      })
                    )}
                    value={props.field.value}
                    onChange={(value) => {
                      props.field.onChange(value)

                      getAppliableModifiersByField(
                        modifiers,
                        field,
                        value
                      ).forEach((modifier) =>
                        form.setValue(
                          String(modifier._condition.applyTo),
                          modifier.default,
                          {
                            shouldDirty: true,
                          }
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
              <div className="bottom-[1px] relative mt-6">
                <div className="h-[38px] flex px-2 bg-white border border-gray-300 rounded-3xl shadow-sm">
                  <Controller
                    control={form.control}
                    name={String(field.id)}
                    rules={{
                      setValueAs: (v) => normalizeFieldValue(field, v),
                    }}
                    render={(props) => (
                      <Switch
                        ref={props.field.ref}
                        label={field.label}
                        value={props.field.value}
                        onChange={(value) => {
                          props.field.onChange(value)

                          getAppliableModifiersByField(
                            modifiers,
                            field,
                            value
                          ).forEach((modifier) =>
                            form.setValue(
                              String(modifier._condition.applyTo),
                              modifier.default,
                              {
                                shouldDirty: true,
                              }
                            )
                          )
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            )
          }

          default: {
            return "Unknown field" // TODO
          }
        }
      })()}
    </div>
  )
}
