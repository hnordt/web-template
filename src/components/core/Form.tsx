import React from "react"
import { UseMutationResult } from "react-query"
import { Transition } from "@headlessui/react"
import { Controller, UseFormReturn, useForm, useWatch } from "react-hook-form"
import { useId } from "@reach/auto-id"
import cn from "classnames"
import RadioGroup from "components/core/RadioGroup"
import Select from "components/core/Select"
import Loader from "components/core/Loader"

interface FormContextProps {
  readOnly: boolean
  loading: boolean
}

const FormContext = React.createContext<FormContextProps>({
  readOnly: false,
  loading: false,
})

interface FormProviderProps {
  readOnly?: boolean
  loading?: boolean
  children: React.ReactNode
}

export function FormProvider(props: FormProviderProps) {
  return (
    <FormContext.Provider
      value={{
        readOnly: props.readOnly ?? false,
        loading: props.loading ?? false,
      }}
    >
      {props.children}
    </FormContext.Provider>
  )
}

interface FormRootProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

export function FormRoot(props: FormRootProps) {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit?.(e)
      }}
    >
      {props.children}
    </form>
  )
}

export interface FormInputProps {
  className?: string
  id?: string
  type: "text" | "number" | "date" | "email" | "tel" | "radio" | "select"
  name: string
  label?: string
  options?: Array<{
    label: string
    description?: string
    value: any
    disabled?: boolean
  }>
  defaultValue?: any
  placeholder?: string
  autoComplete?: string
  help?: string
  error?: string
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  required?: string
  hidden?: (props: { values: any }) => boolean
  multiple?: boolean
  readOnly?: boolean
  disabled?: boolean
  messages?: {
    noOptions?: () => string
  }
}

export const FormInput = React.forwardRef<any, FormInputProps>(
  function FormInput(props, ref) {
    const {
      className,
      label,
      options,
      help,
      error,
      size,
      hidden,
      messages,
      ...rest
    } = props

    const id = useId(rest.id)

    const formContext = React.useContext(FormContext)

    const readOnly =
      props.readOnly || formContext?.readOnly || formContext?.loading

    return (
      <div
        className={
          {
            "1/2": "w-1/2",
          }[size] ??
          className ??
          "w-full"
        }
      >
        {label && rest.type !== "radio" && (
          <label
            className="flex items-baseline justify-between mb-1 text-gray-700 text-sm font-medium"
            htmlFor={id}
          >
            {label}
            <Transition
              as="span"
              className="text-red-700 text-xs font-medium"
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={!!error}
            >
              {error}
            </Transition>
          </label>
        )}
        {rest.type === "radio" ? (
          <RadioGroup
            {...rest}
            ref={ref}
            id={id}
            options={options}
            required={!!rest.required}
            disabled={readOnly || rest.disabled}
          />
        ) : rest.type === "select" ? (
          <>
            <Select
              {...rest}
              ref={ref}
              id={id}
              options={options}
              required={!!rest.required}
              // TODO
              disabled={readOnly || rest.disabled}
              messages={messages}
            />
            {/* <select
              {...rest}
              ref={ref}
              className="placeholder-gray-400 block pr-10 px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
              id={id}
              // TODO
              disabled={readOnly || rest.disabled}
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={!!option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select> */}
          </>
        ) : (
          <input
            {...rest}
            ref={ref}
            className="placeholder-gray-400 block px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
            id={id}
            readOnly={readOnly}
            required={!!rest.required}
          />
        )}
        {help && <p className="mt-1.5 text-gray-500 text-sm">{help}</p>}
      </div>
    )
  }
)

interface FormButtonProps {
  type?: "submit"
  variant: "primary" | "secondary" | "danger"
  icon?: React.FunctionComponent<{ className: string }>
  fill?: boolean
  readOnly?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

export function FormButton(props: FormButtonProps) {
  const formContext = React.useContext(FormContext)

  const readOnly = props.readOnly || formContext.readOnly
  const loading =
    props.loading || (props.type === "submit" && formContext.loading)

  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 h-9 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" && [
          "text-white bg-blue-600 border-transparent",
          !(readOnly || props.disabled || loading) && "hover:bg-blue-700",
        ],
        props.variant === "secondary" && [
          "text-gray-700 bg-white border-gray-300",
          !(readOnly || props.disabled || loading) && "hover:bg-gray-50",
        ],
        props.variant === "danger" && [
          "text-white bg-red-600 border-transparent",
          !(readOnly || props.disabled || loading) && "hover:bg-red-700",
        ],
        props.fill && "w-full",
        (readOnly || props.disabled || loading) && "cursor-auto"
      )}
      type={props.type ?? "button"}
      disabled={readOnly || props.disabled || loading}
      onClick={props.onClick}
    >
      {loading ? (
        <Loader
          variant={props.variant === "secondary" ? "dark" : "light"}
          size="sm"
        />
      ) : props.icon ? (
        React.createElement(props.icon, {
          className: "w-5 h-5",
        })
      ) : (
        props.children
      )}
    </button>
  )
}

export type RenderContent = (props: {
  form: UseFormReturn
  values: any
  registerField: (inputEl: React.ReactElement) => React.ReactElement
  children: React.ReactNode
}) => React.ReactNode

interface FormProps {
  fields: Array<FormInputProps>
  defaultValues?: Object
  submitLabel?: string
  mutation?: UseMutationResult
  actions?: Array<{
    variant: "primary" | "secondary"
    icon?: React.FunctionComponent
    label?: string
    mutation?: UseMutationResult
    loading?: boolean
    onClick?: () => void
    onSuccess?: (data: any) => void
    onError?: (error: Error) => void
  }>
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  readOnly?: boolean
  loading?: boolean
  renderContent?: RenderContent
  renderFooter?: (props: {
    form: UseFormReturn
    children: React.ReactNode
  }) => React.ReactNode
  onSubmit?: (values: Object) => void
  onCancel?: () => void
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export default function Form(props: FormProps) {
  const form = useForm<any>({
    defaultValues: props.defaultValues,
  })
  const values = form.watch()

  const loading = props.loading ?? props.mutation?.status === "loading"

  const defaultActions: any = [
    props.onCancel && {
      variant: "secondary",
      label: "Cancel",
      disabled: loading,
      onClick: props.onCancel,
    },
    {
      type: "submit",
      variant: "primary",
      label: props.submitLabel ?? "Submit",
    },
  ].filter(Boolean)

  const customActions = props.actions

  return (
    <FormProvider readOnly={props.readOnly} loading={loading}>
      <FormRoot
        onSubmit={form.handleSubmit(
          (values) =>
            void props.onSubmit?.(values) ??
            props.mutation
              ?.mutateAsync(values)
              .then(props.onSuccess)
              .catch(props.onError)
        )}
      >
        {(props.renderContent || ((props) => props.children))({
          form,
          values,
          registerField: (inputEl) => (
            <Controller
              control={form.control}
              name={inputEl.props.name}
              defaultValue={inputEl.props.defaultValue}
              rules={{
                required: inputEl.props.required,
              }}
              render={(props) =>
                React.cloneElement(inputEl, {
                  ...props.field,
                  error: form.formState.errors[inputEl.props.name]?.message,
                })
              }
            />
          ),
          children: (
            <div
              className={cn(
                "grid grid-cols-12",
                {
                  1: "gap-1",
                  2: "gap-2",
                  3: "gap-3",
                  4: "gap-4",
                  5: "gap-5",
                  6: "gap-6",
                  7: "gap-7",
                  8: "gap-8",
                  9: "gap-9",
                  10: "gap-10",
                  11: "gap-11",
                  12: "gap-12",
                }[props.gap ?? 5]
              )}
            >
              {props.fields
                .filter(
                  (field) =>
                    !field.hidden?.({
                      values,
                    })
                )
                .map((field) => (
                  <div
                    key={field.name}
                    className={
                      {
                        1: "col-span-1",
                        2: "col-span-2",
                        3: "col-span-3",
                        4: "col-span-4",
                        5: "col-span-5",
                        6: "col-span-6",
                        7: "col-span-7",
                        8: "col-span-8",
                        9: "col-span-9",
                        10: "col-span-10",
                        11: "col-span-11",
                        12: "col-span-12",
                      }[field.size]
                    }
                  >
                    <Controller
                      control={form.control}
                      name={field.name}
                      defaultValue={field.defaultValue}
                      rules={{
                        required: field.required ? "Required" : undefined,
                      }}
                      render={(props) => (
                        <FormInput
                          {...field}
                          {...props.field}
                          error={form.formState.errors[field.name]?.message}
                        />
                      )}
                    />
                  </div>
                ))}
            </div>
          ),
        })}
        {(
          props.renderFooter ??
          ((props) => <div className="mt-6">{props.children}</div>)
        )({
          form,
          children: (
            <div className="flex justify-between space-x-6">
              <div className="flex justify-end space-x-3">
                {customActions?.map((action) => (
                  <FormButton
                    key={action.label ?? action.icon?.name}
                    {...action}
                    loading={
                      action.mutation?.status === "loading" ?? action.loading
                    }
                    onClick={action.onClick}
                  >
                    {action.label}
                  </FormButton>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                {defaultActions.map((action) => (
                  <FormButton
                    key={action.label ?? action.icon?.name}
                    {...action}
                  >
                    {action.label}
                  </FormButton>
                ))}
              </div>
            </div>
          ),
        })}
      </FormRoot>
    </FormProvider>
  )
}
