import React from "react"
import { UseMutationResult } from "react-query"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { useId } from "@reach/auto-id"
import cn from "classnames"
import Loader from "components/core/alpha/Loader"

interface FormContextProps {
  readOnly: boolean
  loading: boolean
}

const FormContext = React.createContext<FormContextProps>({
  readOnly: false,
  loading: false,
})

interface FormProviderProps {
  readOnly: boolean
  loading: boolean
  children: React.ReactNode
}

export function FormProvider(props: FormProviderProps) {
  return (
    <FormContext.Provider
      value={{
        readOnly: props.readOnly,
        loading: props.loading,
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
  id?: string
  type: "text" | "number" | "select" | "email" | "tel"
  name: string
  label?: string
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  autoComplete?: string
  error?: string
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  readOnly?: boolean
  disabled?: boolean
  required?: boolean
}

export const FormInput = React.forwardRef<any, FormInputProps>(
  function FormInput(props, ref) {
    const { label, options, error, size, ...rest } = props

    const id = useId(rest.id)

    const formContext = React.useContext(FormContext)

    const readOnly =
      props.readOnly || formContext?.readOnly || formContext?.loading

    return (
      <div
        className={
          {
            "1/2": "w-1/2",
          }[size] ?? "w-full"
        }
      >
        {label && (
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
        {rest.type === "select" ? (
          <select
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
          </select>
        ) : (
          <input
            {...rest}
            ref={ref}
            className="placeholder-gray-400 block px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
            id={id}
            readOnly={readOnly}
          />
        )}
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
  renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  renderFooter?: (props: { children: React.ReactNode }) => React.ReactNode
  onSubmit?: (values: Object) => void
  onCancel?: () => void
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export default function Form(props: FormProps) {
  const form = useForm<any>({
    defaultValues: {
      // We need to spread props.defaultValues because we might want to pass
      // some values while not rendering/registering them
      ...props.defaultValues,
      // We need to enforce an empty string if no defaultValue was provided
      ...props.fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: props.defaultValues?.[field.name] ?? "",
        }),
        {}
      ),
    },
  })

  const loading = props.loading ?? props.mutation?.status === "loading"

  const defaultActions: any = [
    props.onCancel && {
      variant: "secondary",
      label: "Cancelar",
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
              {props.fields.map((field) => (
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
                  <FormInput
                    {...field}
                    {...form.register(field.name, {
                      required: field.required ? "Required" : undefined,
                    })}
                    error={form.formState.errors[field.name]?.message}
                  />
                </div>
              ))}
            </div>
          ),
        })}
        {(props.renderFooter ?? ((props) => props.children))({
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
