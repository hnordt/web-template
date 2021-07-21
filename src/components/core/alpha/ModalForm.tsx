import React from "react"
import { UseQueryResult, UseMutationResult } from "react-query"
import Form, { FormInputProps } from "components/core/alpha/Form"
import Modal from "components/core/alpha/Modal"

interface ModalFormProps {
  title: string
  description?: string
  fields: Array<FormInputProps>
  defaultValues?: Object
  submitLabel?: string
  mutation: UseMutationResult
  open: boolean
  onClose?: { push?: any } | (() => void)
  onSuccess?:
    | string
    | { toast?: string; refetch: UseQueryResult; push?: any }
    | ((data: any) => void)
  onError?: boolean | ((error: Error) => void)
}

export default function ModalForm(props: ModalFormProps) {
  return (
    <Modal
      title={props.title}
      description={props.description}
      open={props.open}
      renderContent={(props) => props.children}
      onClose={props.onClose}
    >
      <Form
        fields={props.fields}
        defaultValues={props.defaultValues}
        submitLabel={props.submitLabel}
        mutation={props.mutation}
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
