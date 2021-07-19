import React from "react"
import { UseMutationResult } from "react-query"
import { Transition } from "@headlessui/react"
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

interface FormInputProps {
  id?: string
  type: "text" | "number"
  name: string
  label?: string
  error?: string
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  readOnly?: boolean
  required?: boolean
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(props, ref) {
    const { label, error, size, ...rest } = props

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
        <input
          {...rest}
          ref={ref}
          className="placeholder-gray-400 block px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
          id={id}
          readOnly={readOnly}
        />
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
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

export function FormButton(props: FormButtonProps) {
  const formContext = React.useContext(FormContext)

  const readOnly = props.readOnly || formContext.readOnly
  const loading = props.loading || formContext.loading

  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 h-9 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" && [
          "text-white bg-blue-600 border-transparent",
          !(readOnly || loading) && "hover:bg-blue-700",
        ],
        props.variant === "secondary" && [
          "text-gray-700 bg-white border-gray-300",
          !(readOnly || loading) && "hover:bg-gray-50",
        ],
        props.variant === "danger" && [
          "text-white bg-red-600 border-transparent",
          !(readOnly || loading) && "hover:bg-red-700",
        ],
        props.fill && "w-full",
        (readOnly || loading) && "cursor-auto"
      )}
      type={props.type ?? "button"}
      disabled={readOnly || loading}
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
  actions?: Array<FormButtonProps>
  mutation?: UseMutationResult
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  readOnly?: boolean
  loading?: boolean
  renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  renderFooter?: (props: { children: React.ReactNode }) => React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel?: () => void
}

export default function Form(props: FormProps) {
  return (
    <FormProvider readOnly={props.readOnly} loading={props.loading}>
      <FormRoot onSubmit={() => {}}>
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
                }[props.gap ?? 4]
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
                  <FormInput {...field} />
                </div>
              ))}
            </div>
          ),
        })}
        {(props.renderFooter ?? ((props) => props.children))({
          children: (
            <div className="flex justify-end space-x-3">
              {(
                props.actions ??
                [
                  props.onCancel && {
                    variant: "secondary",
                    label: "Cancel",
                    onClick: props.onCancel,
                  },
                  {
                    type: "submit",
                    variant: "primary",
                    label: "Submit",
                  },
                ].filter(Boolean)
              ).map((action) => (
                <FormButton key={action.label ?? action.icon?.name} {...action}>
                  {action.label}
                </FormButton>
              ))}
            </div>
          ),
        })}
      </FormRoot>
    </FormProvider>
  )
}
