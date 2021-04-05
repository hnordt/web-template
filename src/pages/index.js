import React from "react"
import { Controller, useForm } from "react-hook-form"
import dayjs from "dayjs"
import Card, {
  CardHeader,
  CardColumns,
  CardColumn,
  CardFooter,
} from "components/alpha/Card"
import Tabs, { TabList, Tab, TabPanels, TabPanel } from "components/alpha/Tabs"
import settings from "data/settings.json"
import Input from "components/alpha/Input"
import Checkbox from "components/alpha/Checkbox"
import Select from "components/alpha/Select"
import Button from "components/alpha/Button"
import _ from "lodash/fp"
import {
  RiArrowRightLine,
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankLine,
  RiCheckboxCircleLine,
  RiCheckboxLine,
  RiErrorWarningLine,
  RiEyeLine,
  RiSave3Fill,
} from "react-icons/ri"
import { PopoverDisclosure, Popover, usePopoverState } from "reakit"
import DurationInput from "components/alpha/DurationInput"

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

function ReadOnlyField(props) {
  const content = (
    <>
      {props.config.value_type === "key_value" ? (
        _.invert(props.config.value_lower)[
          props.currentValues[props.config.id]
        ] ?? "N/D"
      ) : props.config.value_type === "boolean" ? (
        props.currentValues[props.config.id] ? (
          <RiCheckboxCircleLine className="inline-block w-5 h-5 text-green-500" />
        ) : (
          <RiCheckboxBlankCircleLine className="inline-block w-5 h-5" />
        )
      ) : (
        props.currentValues[props.config.id] ?? "N/D"
      )}
      {props.config.value_unit &&
        (props.config.value_unit === "%"
          ? props.config.value_unit
          : ` ${props.config.value_unit}`)}
    </>
  )

  if (props.onlyContent) {
    return content
  }

  return (
    <div className="grid gap-4 grid-cols-2 px-6 py-5">
      <dt className="text-gray-500 text-sm font-medium">
        {props.config.label}
      </dt>
      <dd className="text-gray-900 text-sm">{content}</dd>
    </div>
  )
}

function Field(props) {
  if (props.config.display === false) {
    return null
  }

  return (
    <div className="grid gap-4 grid-cols-12 items-center px-6 py-5">
      <div className="col-span-4">
        <label
          htmlFor={props.config.id}
          className="block text-gray-700 text-sm font-medium"
        >
          {props.config.label}
        </label>
      </div>
      <div className="col-span-3">
        {props.config.value_type === "integer" ||
        props.config.value_type === "float" ? (
          <Input
            {...props.form.register(String(props.config.id), {
              min: {
                value: props.config.value_lower,
                message: `The minimum value for this field is ${props.config.value_lower}`,
              },
              max: {
                value: props.config.value_upper,
                message: `The maximum value for this field is ${props.config.value_upper}`,
              },
              validate: (value) =>
                value === undefined ||
                value === null ||
                value === "" ||
                Number.isNaN(value)
                  ? "This field is required"
                  : true,
              valueAsNumber: true,
            })}
            id={props.config.id}
            type="number"
            step={props.config.value_type === "float" ? 0.1 : 1}
            min={props.config.value_lower}
            max={props.config.value_upper}
            rightAddon={props.config.value_unit}
          />
        ) : props.config.value_type === "boolean" ? (
          <Checkbox
            {...props.form.register(String(props.config.id))}
            id={props.config.id}
          />
        ) : props.config.value_type === "key_value" ? (
          <Select
            {...props.form.register(String(props.config.id), {
              required: "This field is required",
            })}
            id={props.config.id}
            options={Object.entries(props.config.value_lower).map(
              ([label, value]) => ({
                label,
                value,
              })
            )}
          />
        ) : props.config.value_type === "list" ? (
          <Select
            {...props.form.register(String(props.config.id), {
              required: "This field is required",
            })}
            id={props.config.id}
            options={props.config.value_lower.split(",").map((value) => ({
              label: value,
              value,
            }))}
          />
        ) : props.config.value_type === "string" ? (
          <Input
            {...props.form.register(String(props.config.id), {
              required: "This field is required",
            })}
            id={props.config.id}
            type="text"
            placeholder={props.config.value_lower}
          />
        ) : props.config.value_type === "time" ? (
          <Input
            {...props.form.register(String(props.config.id), {
              required: "This field is required",
            })}
            id={props.config.id}
            type="time"
            min={dayjs()
              .startOf("day")
              .add(enforceSeconds(props.config.value_lower), "seconds")
              .format("HH:mm")}
            max={dayjs()
              .startOf("day")
              .add(enforceSeconds(props.config.value_upper), "seconds")
              .format("HH:mm")}
          />
        ) : props.config.value_type === "duration" ? (
          <Controller
            control={props.form.control}
            name={String(props.config.id)}
            rules={{
              required: "This field is required",
            }}
            render={(props) => (
              <DurationInput
                {...props.field}
                onValueChange={props.field.onChange}
              />
            )}
          />
        ) : (
          <Input
            id={props.config.id}
            type="text"
            defaultValue="Unknown"
            disabled
          />
        )}
      </div>
      <div className="col-span-2">
        {((typeof props.config.value_lower === "string" &&
          !props.config.value_lower.includes(",")) ||
          typeof props.config.value_lower === "number") &&
          (typeof props.config.value_upper === "string" ||
            typeof props.config.value_upper === "number") && (
            <span className="block text-gray-500 text-sm">
              ({props.config.value_lower}-{props.config.value_upper})
            </span>
          )}
      </div>
      <div className="col-span-3">
        <div className="flex justify-end">
          {props.form.formState.errors[props.config.id] ? (
            <p className="flex items-center text-red-700 text-sm font-medium space-x-1">
              <RiErrorWarningLine className="w-4 h-4" />
              <span>
                {props.form.formState.errors[props.config.id].message}
              </span>
            </p>
          ) : props.form.formState.dirtyFields[props.config.id] ? (
            <div className="flex items-center space-x-2">
              <span className="relative inline-flex items-center px-2.5 py-0.5 text-red-800 line-through text-sm font-medium bg-red-100 rounded-md">
                {props.config.value_type === "key_value" ? (
                  _.invert(props.config.value_lower)[
                    props.defaultValues[props.config.id]
                  ] ?? "N/D"
                ) : props.config.value_type === "boolean" ? (
                  <>
                    {props.defaultValues[props.config.id] ? (
                      <RiCheckboxLine className="w-4 h-4" />
                    ) : (
                      <RiCheckboxBlankLine className="w-4 h-4" />
                    )}
                    <span className="absolute left-2 right-2 top-1/2 h-px bg-red-800" />
                  </>
                ) : (
                  props.defaultValues[props.config.id] ?? "N/D"
                )}
              </span>
              <RiArrowRightLine className="w-4 h-4 text-gray-500" />
              <span className="inline-flex items-center px-2.5 py-0.5 text-green-800 text-sm font-medium bg-green-100 rounded-md">
                {props.config.value_type === "key_value" ? (
                  _.invert(props.config.value_lower)[
                    props.form.watch(String(props.config.id))
                  ] ?? "N/D"
                ) : props.config.value_type === "boolean" ? (
                  props.form.watch(String(props.config.id)) ? (
                    <RiCheckboxLine className="w-4 h-4" />
                  ) : (
                    <RiCheckboxBlankLine className="w-4 h-4" />
                  )
                ) : (
                  props.form.watch(String(props.config.id)) ?? "N/D"
                )}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function Index() {
  const [mainNavTabIndex, setMainNavTabIndex] = React.useState(0)
  const [secondaryNavTabIndex, setSecondaryNavTabIndex] = React.useState(0)
  const [tertiaryNavTabIndex, setTertiaryNavTabIndex] = React.useState(0)

  React.useEffect(() => {
    setSecondaryNavTabIndex(0)
  }, [mainNavTabIndex])

  React.useEffect(() => {
    setTertiaryNavTabIndex(0)
  }, [secondaryNavTabIndex])

  const fields = settings.flatMap((setting) =>
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
              component: component.component,
            },
          }))
        ),
      ],
      []
    )
  )

  const defaultValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]:
        field.value_type === "time"
          ? dayjs()
              .startOf("day")
              .add(
                enforceSeconds(field.value.value ?? field.default ?? 0),
                "seconds"
              )
              .format("HH:mm")
          : field.value.value ?? field.default ?? "",
    }),
    {}
  )

  const form = useForm({
    mode: "onChange",
    defaultValues,
  })

  const currentValues = form.watch()

  const modifiers = settings
    .flatMap((setting) =>
      setting.child.map((child) =>
        child.setting.reduce(
          (acc, field) => ({
            ...acc,
            ...field.child.reduce(
              (acc, child) =>
                child.condition &&
                String(currentValues[field.id]) ===
                  String(JSON.parse(child.condition).value)
                  ? {
                      ...acc,
                      [child.setting_definition_child]: _.omit(
                        ["setting_definition_child", "condition"],
                        child
                      ),
                    }
                  : acc,
              {}
            ),
          }),
          {}
        )
      )
    )
    .reduce(
      (acc, fields) => ({
        ...acc,
        ...fields,
      }),
      {}
    )

  const popover = usePopoverState({
    placement: "bottom-end",
  })

  return (
    <main className="p-6">
      <form
        noValidate
        onSubmit={async (e) => {
          e.preventDefault()

          const result = await form.trigger()

          console.log({
            result,
          })

          if (!result) {
            const field = fields.find(
              (field) =>
                String(field.id) === Object.keys(form.formState.errors)[0]
            )

            console.log({
              errors: form.formState.errors,
              field,
            })

            if (field) {
              const mainNavTabIndex = settings.findIndex(
                (setting) => setting.id === field.meta.settingId
              )

              const secondaryNavTabIndex = settings[
                mainNavTabIndex
              ].child.findIndex((child) => child.id === field.meta.childId)

              const tertiaryNavTabIndex = settings[mainNavTabIndex].child[
                secondaryNavTabIndex
              ].component.findIndex(
                (component) => component.component === field.meta.component
              )

              // TODO: remove timeouts

              setMainNavTabIndex(mainNavTabIndex)

              setTimeout(() => {
                setSecondaryNavTabIndex(secondaryNavTabIndex)
              }, 100)

              setTimeout(() => {
                setTertiaryNavTabIndex(
                  tertiaryNavTabIndex > -1 ? tertiaryNavTabIndex : 0
                )
              }, 200)
            }

            setTimeout(
              async () =>
                form.handleSubmit((values) => {
                  form.reset(values)

                  console.log(values)
                })(),
              500
            )
          }
        }}
      >
        <Card>
          <Tabs index={mainNavTabIndex} onChange={setMainNavTabIndex}>
            <CardHeader>
              <TabList>
                {settings.map((setting) => (
                  <Tab key={setting.id}>
                    <span className="flex items-center justify-between w-full space-x-2">
                      <span>{setting.category}</span>
                      {fields
                        .filter((field) => field.meta.settingId === setting.id)
                        .some(
                          (field) => form.formState.dirtyFields[field.id]
                        ) && (
                        <span className="relative">
                          <RiSave3Fill className="w-4 h-4 text-blue-500" />
                          <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        </span>
                      )}
                    </span>
                  </Tab>
                ))}
              </TabList>
              <div>
                <PopoverDisclosure
                  {...popover}
                  className="inline-flex items-center space-x-1.5"
                >
                  <RiEyeLine className="w-6 h-6 text-gray-500" />
                  <span className="text-gray-700 text-sm font-medium">
                    Preview
                  </span>
                </PopoverDisclosure>
                <Popover
                  {...popover}
                  className={`z-10 ${
                    settings[mainNavTabIndex].child[secondaryNavTabIndex]
                      ?.component.length === 0
                      ? "max-w-3xl"
                      : "max-w-7xl"
                  } bg-white border border-gray-100 rounded-lg focus:outline-none shadow-xl overflow-hidden`}
                  aria-label="Preview"
                >
                  <div className="px-6 py-5">
                    <nav className="flex">
                      <ol className="flex items-center space-x-4">
                        <li>
                          <div>
                            <a
                              href="#todo"
                              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                            >
                              {settings[mainNavTabIndex].category}
                            </a>
                          </div>
                        </li>
                        {settings[mainNavTabIndex].child[
                          secondaryNavTabIndex
                        ] && (
                          <li>
                            <div className="flex items-center">
                              <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <a
                                href="#todo"
                                className="ml-4 text-gray-500 hover:text-gray-700 text-sm font-medium"
                              >
                                {
                                  settings[mainNavTabIndex].child[
                                    secondaryNavTabIndex
                                  ].category
                                }
                              </a>
                            </div>
                          </li>
                        )}
                      </ol>
                    </nav>
                  </div>
                  <div className="border-t border-gray-200">
                    {settings[mainNavTabIndex].child[secondaryNavTabIndex]
                      ?.component.length === 0 ? (
                      <dl className="divide-gray-200 divide-y">
                        {settings[mainNavTabIndex].child[
                          secondaryNavTabIndex
                        ].setting.map((setting) => (
                          <ReadOnlyField
                            key={setting.id}
                            config={setting}
                            currentValues={currentValues}
                          />
                        ))}
                      </dl>
                    ) : (
                      <table className="divide-gray-200 divide-y">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                              scope="col"
                            >
                              Property
                            </th>
                            {settings[mainNavTabIndex].child[
                              secondaryNavTabIndex
                            ]?.component.map((component) => (
                              <th
                                key={component.component}
                                className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                                scope="col"
                              >
                                {component.component}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-gray-200 divide-y">
                          {settings[mainNavTabIndex].child[
                            secondaryNavTabIndex
                          ]?.component[0].setting.map(
                            (setting, settingIndex) => (
                              <tr key={setting.id}>
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-sm">
                                  {setting.label}
                                </td>
                                {settings[mainNavTabIndex].child[
                                  secondaryNavTabIndex
                                ].component.map((component) => (
                                  <td
                                    key={component.component}
                                    className="px-6 py-4 text-center text-gray-500 whitespace-nowrap text-sm"
                                    // style={{
                                    //   textAlign:
                                    //     component.setting[settingIndex]
                                    //       .value_type === "boolean"
                                    //       ? "center"
                                    //       : undefined,
                                    // }}
                                  >
                                    <ReadOnlyField
                                      config={component.setting[settingIndex]}
                                      currentValues={currentValues}
                                      onlyContent
                                    />
                                  </td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                        {/* {settings[mainNavTabIndex].child[
                          secondaryNavTabIndex
                        ].component.map((component, componentIndex) => (
                          <dl className="divide-gray-200 divide-y">
                            {component.setting.map((setting) => (
                              <ReadOnlyField
                                key={setting.id}
                                config={setting}
                                currentValues={currentValues}
                                hideLabel={componentIndex > 0}
                              />
                            ))}
                          </dl>
                        ))} */}
                      </table>
                    )}
                  </div>
                </Popover>
              </div>
            </CardHeader>
            <TabPanels>
              {settings.map((setting) => (
                <TabPanel key={setting.id}>
                  <Tabs
                    orientation="vertical"
                    index={secondaryNavTabIndex}
                    onChange={setSecondaryNavTabIndex}
                  >
                    <CardColumns>
                      <CardColumn basis="sm">
                        <div className="px-5 py-5">
                          <TabList aria-label="Secondary navigation">
                            {setting.child.map((child) => (
                              <Tab key={child.id}>
                                <span className="flex items-center justify-between w-full space-x-2">
                                  <span>{child.category}</span>
                                  {fields
                                    .filter(
                                      (field) => field.meta.childId === child.id
                                    )
                                    .some(
                                      (field) =>
                                        form.formState.dirtyFields[field.id]
                                    ) && (
                                    <span className="relative">
                                      <RiSave3Fill className="w-4 h-4 text-blue-500" />
                                      <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                    </span>
                                  )}
                                </span>
                              </Tab>
                            ))}
                          </TabList>
                        </div>
                      </CardColumn>
                      <CardColumn>
                        <TabPanels>
                          {setting.child.map((child) => (
                            <TabPanel key={child.id}>
                              <Tabs
                                orientation="vertical"
                                index={tertiaryNavTabIndex}
                                onChange={setTertiaryNavTabIndex}
                              >
                                <div className="flex">
                                  {child.component.length > 0 && (
                                    <div className="px-6 py-5 w-64 border-r border-gray-200">
                                      <TabList>
                                        <Tab>
                                          <span className="flex items-center justify-between w-full space-x-2">
                                            <span>General</span>
                                            {fields
                                              .filter(
                                                (field) =>
                                                  field.meta.settingId ===
                                                    setting.id &&
                                                  field.meta.childId ===
                                                    child.id &&
                                                  !field.meta.component
                                              )
                                              .some(
                                                (field) =>
                                                  form.formState.dirtyFields[
                                                    field.id
                                                  ]
                                              ) && (
                                              <span className="relative">
                                                <RiSave3Fill className="w-4 h-4 text-blue-500" />
                                                <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                              </span>
                                            )}
                                          </span>
                                        </Tab>
                                        {child.component.map((component) => (
                                          <Tab key={component.component}>
                                            <span className="flex items-center justify-between w-full space-x-2">
                                              <span>{component.component}</span>
                                              {fields
                                                .filter(
                                                  (field) =>
                                                    field.meta.settingId ===
                                                      setting.id &&
                                                    field.meta.childId ===
                                                      child.id &&
                                                    field.meta.component ===
                                                      component.component
                                                )
                                                .some(
                                                  (field) =>
                                                    form.formState.dirtyFields[
                                                      field.id
                                                    ]
                                                ) && (
                                                <span className="relative">
                                                  <RiSave3Fill className="w-4 h-4 text-blue-500" />
                                                  <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                                </span>
                                              )}
                                            </span>
                                          </Tab>
                                        ))}
                                      </TabList>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <TabPanels>
                                      <TabPanel>
                                        <div className="divide-gray-200 divide-y">
                                          {child.setting.map((setting) => (
                                            <Field
                                              key={setting.id}
                                              config={{
                                                ...setting,
                                                ...modifiers[setting.id],
                                              }}
                                              defaultValues={defaultValues}
                                              form={form}
                                            />
                                          ))}
                                        </div>
                                      </TabPanel>
                                      {child.component.map((component) => (
                                        <TabPanel key={component.component}>
                                          <div className="divide-gray-200 divide-y">
                                            {component.setting.map(
                                              (setting) => (
                                                <Field
                                                  key={setting.id}
                                                  config={{
                                                    ...setting,
                                                    ...modifiers[setting.id],
                                                  }}
                                                  defaultValues={defaultValues}
                                                  form={form}
                                                />
                                              )
                                            )}
                                          </div>
                                        </TabPanel>
                                      ))}
                                    </TabPanels>
                                  </div>
                                </div>
                              </Tabs>
                            </TabPanel>
                          ))}
                        </TabPanels>
                      </CardColumn>
                    </CardColumns>
                  </Tabs>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <CardFooter>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                disabled={!form.formState.isDirty}
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!form.formState.isDirty}
              >
                Save changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
