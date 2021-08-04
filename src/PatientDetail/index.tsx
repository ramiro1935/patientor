import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListEntries } from './Entries'
import { Grid, Header, Icon, Button } from 'semantic-ui-react'
import { updatePatient, useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { Patient } from '../types'

import AddEntryModal from '../AddEntryModal'
import { EntryFormValues } from '../AddEntryModal/AddEntryForm'

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [{ patients }, dispatch] = useStateValue()
  const [modal, setModal] = useState<boolean>(false)
  const patientSelected = patients?.[id] ?? null
  const genderIcon =
    patientSelected?.gender === 'male' ? 'male' : 'female' ?? null

  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: pacientDetail } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(updatePatient(pacientDetail))
      } catch (e) {
        console.log(e)
      }
    }
    const verifyExistPatient = () => {
      const patient = patients?.[id]?.entries
      if (!patient) {
        void fetchPatientDetail()
      }
    }
    verifyExistPatient()
  }, [dispatch])

  const onSubmit = (values: EntryFormValues) => {
    console.log({values})
  }

  const onClose = () => {
    setModal(false)
  }

  const onShow = () => {
    setModal(true)
  }

  if (!patientSelected) return <div>Paciente no existe</div>
  return (
    <Grid columns={12}>
      <Grid.Row verticalAlign='middle'>
        <Header as='h2'>{patientSelected.name}</Header>
        <Icon size='large' name={genderIcon} />
        <Button type='button' onClick={onShow} color='green'>
          Add new entry
        </Button>
      </Grid.Row>
      <Grid.Row>
        <div>ssn: {patientSelected.ssn}</div>
      </Grid.Row>
      <Grid.Row>
        <div>occupation: {patientSelected.occupation}</div>
      </Grid.Row>
      {<ListEntries entries={patientSelected.entries} />}
      <AddEntryModal onSubmit={onSubmit} onClose={onClose} modalOpen={modal} />
    </Grid>
  )
}

export default PatientDetail
