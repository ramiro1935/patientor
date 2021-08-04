import React from 'react'
import { Modal } from 'semantic-ui-react'

import AddEntryForm, { EntryFormValues } from './AddEntryForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: EntryFormValues) => void //FIXME: cambiar el tipo
  error?: string
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        {error}
      </Modal.Content>
    </Modal>
  )
}

export default AddEntryModal
