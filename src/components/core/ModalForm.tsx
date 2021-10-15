import React from "react"
import { UseMutationResult } from "react-query"
import Form, { FormInputProps, RenderContent } from "components/core/Form"
import Modal from "components/core/Modal"

interface ModalFormProps {
  title: string
  description?: string
  fields: Array<FormInputProps>
  defaultValues?: Object
  submitLabel?: string
  mutation?: UseMutationResult
  actions?: Array<{
    variant: "primary" | "secondary"
    icon?: React.FunctionComponent<{ className: string }>
    label?: string
    mutation?: UseMutationResult
    loading?: boolean
    onClick?: () => void
    onSuccess?: (data: any) => void
    onError?: (error: Error) => void
  }>
  size: "lg" | "3xl" | "4xl"
  renderContent?: RenderContent
  open: boolean
  onSubmit?: (values: Object) => void
  onClose?: () => void
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export default function ModalForm(props: ModalFormProps) {
  return (
    <Modal
      title={props.title}
      description={props.description}
      size={props.size}
      open={props.open}
      renderContent={(props) => props.children}
      onClose={props.onClose}
    >
      <Form
        fields={props.fields}
        defaultValues={props.defaultValues}
        submitLabel={props.submitLabel}
        mutation={props.mutation}
        actions={props.actions}
        renderContent={(_props) => (
          <div className="p-6">
            {props.renderContent
              ? props.renderContent(_props)
              : _props.children}
          </div>
        )}
        renderFooter={(props) => (
          <div className="p-6 border-t border-gray-200">{props.children}</div>
        )}
        onSubmit={props.onSubmit}
        onCancel={props.onClose}
        onSuccess={props.onSuccess}
        onError={props.onError}
      />
    </Modal>
  )
}
