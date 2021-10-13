import React from "react"
import { UseMutationResult } from "react-query"
import Form, { FormInputProps } from "components/core/Form"
import Modal from "components/core/Modal"

interface ModalFormProps {
  title: string
  description?: string
  fields: Array<FormInputProps>
  defaultValues?: Object
  submitLabel?: string
  mutation: UseMutationResult
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
  open: boolean
  onClose?: () => void
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export default function ModalForm(props: ModalFormProps) {
  return (
    <Modal
      title={props.title}
      description={props.description}
      size="lg"
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
        renderContent={(props) => <div className="p-6">{props.children}</div>}
        renderFooter={(props) => (
          <div className="p-6 border-t border-gray-200">{props.children}</div>
        )}
        onCancel={props.onClose}
        onSuccess={props.onSuccess}
        onError={props.onError}
      />
    </Modal>
  )
}
