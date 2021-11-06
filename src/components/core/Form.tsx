import React from "react"
import {
  FormProvider,
  Controller,
  useForm,
  useFormContext,
} from "react-hook-form"
import { useId } from "@reach/auto-id"
import cx from "classnames"
import Button, { ButtonProps } from "components/core/Button"

interface FormFieldProps {
  className?: string
  name: string
  label?: string
  hint?: string
  defaultValue?: any
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  required?: string | boolean
  children: React.ReactElement
}

export function FormField(props: FormFieldProps) {
  const id = useId()

  const form = useFormContext()
  const error = form.formState.errors[props.name]

  return (
    <div
      className={cx(
        props.span === 1 && "col-span-1",
        props.span === 2 && "col-span-2",
        props.span === 3 && "col-span-3",
        props.span === 4 && "col-span-4",
        props.span === 5 && "col-span-5",
        props.span === 6 && "col-span-6",
        props.span === 7 && "col-span-7",
        props.span === 8 && "col-span-8",
        props.span === 9 && "col-span-9",
        props.span === 10 && "col-span-10",
        props.span === 11 && "col-span-11",
        props.span === 12 && "col-span-12",
        props.className
      )}
    >
      {props.label && (
        <label
          className="block mb-1 text-gray-700 text-sm font-medium"
          htmlFor={id}
        >
          {props.label}
        </label>
      )}
      <Controller
        control={form.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={{
          required: props.required === true ? "Required" : props.required,
        }}
        render={(renderProps) =>
          React.cloneElement(props.children, {
            ref: renderProps.field.ref,
            id,
            name: renderProps.field.name,
            value: renderProps.field.value,
            error: renderProps.fieldState.error?.message,
            required: !!props.required,
            readOnly:
              form.formState.isSubmitting || props.children.props.readOnly,
            onChange: renderProps.field.onChange,
            onBlur: renderProps.field.onBlur,
          })
        }
      />
      {error ? (
        <p className="mt-2 text-red-600 text-sm">{error.message}</p>
      ) : (
        props.hint && <p className="mt-2 text-gray-500 text-sm">{props.hint}</p>
      )}
    </div>
  )
}

interface FormActionsProps {
  children: React.ReactNode
}

export function FormActions(props: FormActionsProps) {
  return (
    <div className="flex col-span-12 justify-end mt-2 space-x-3">
      {props.children}
    </div>
  )
}

export function FormButton(props: ButtonProps) {
  const form = useFormContext()

  return (
    <Button
      {...props}
      loading={
        props.type === "submit"
          ? form.formState.isSubmitting || props.loading
          : props.loading
      }
      disabled={
        props.type === "submit"
          ? props.disabled
          : form.formState.isSubmitting || props.disabled
      }
      onClick={(e) => {
        if (props.type === "reset") {
          form.reset()
        }

        props.onClick?.(e)
      }}
    />
  )
}

interface FormProps {
  layout?: "grid"
  defaultValues: any
  watch?: string[]
  onSubmit?: (values: any) => Promise<any> | void
  children: ({ values: any }) => React.ReactNode | React.ReactNode
}

export default function Form(props: FormProps) {
  const form = useForm({
    defaultValues: props.defaultValues,
  })
  // const values = props.watch
  //   ? form.watch(props.watch).reduce(
  //       (acc, fieldValue, fieldIndex) => ({
  //         ...acc,
  //         [props.watch[fieldIndex]]: fieldValue,
  //       }),
  //       {}
  //     )
  //   : []
  // TODO: enable optimization
  const values = form.watch()

  return (
    <FormProvider {...form}>
      <form
        className={
          props.layout === undefined || props.layout === "grid"
            ? "grid gap-4 grid-cols-12"
            : undefined
        }
        noValidate
        onSubmit={form.handleSubmit(props.onSubmit)}
      >
        {typeof props.children === "function"
          ? props.children({
              values,
            })
          : props.children}
      </form>
    </FormProvider>
  )
}
