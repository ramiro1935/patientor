import React, { useState, useEffect } from 'react'
import { Form, Formik, Field } from 'formik'
import { Grid, Button } from 'semantic-ui-react'

import { Diagnoses, Entry, HealthCheckRating, UnionOmit } from '../types'
import {
  TypeOption,
  SelectType,
  NumberField,
  TextField,
  DateField,
  DiagnosisSelection,
} from '../AddPatientModal/FormField'

export type EntryFormValues = UnionOmit<Entry, 'id'>

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
]

const diagnosisOptions: Diagnoses[] = [
  { code: 'Z57.1', name: 'diagnoses 1' },
  { code: 'Z74.3', name: 'diagnoses 1' },
  { code: 'M51.2', name: 'diagnoses 1' },
]
const initialValuesHealth: EntryFormValues = {
  type: 'HealthCheck',
  description: '',
  date: '',
  specialist: '',
  healthCheckRating: HealthCheckRating.Healthy,
}
const initialValuesOccupational = {
  type: 'OccupationalHealthcare',
  description: '',
  date: '',
  specialist: '',
  employerName: '',
  'sickLeave.startDate': '',
  'sickLeave.endDate': '',
} as EntryFormValues

const initialValuesHospital = {
  type: 'Hospital',
  description: '',
  date: '',
  specialist: '',
  'discharge.date': '',
  'discharge.criteria': '',
} as EntryFormValues

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [initialValues, setInitialValuesByType] =
    useState<EntryFormValues>(initialValuesHealth)
  const [type, setType] = useState<Entry['type']>('HealthCheck')

  useEffect(() => {
    const selectType = () => {
      switch (type) {
        case 'HealthCheck':
          setInitialValuesByType(initialValuesHealth)
          break
        case 'Hospital':
          setInitialValuesByType(initialValuesHospital)
          break
        case 'OccupationalHealthcare':
          setInitialValuesByType(initialValuesOccupational)
          break

        default:
          break
      }
    }
    selectType()
  }, [type])

  const onChange = (e: any) => {
    setType(e.target.value)
  }

  const renderBody = () => {
    switch (type) {
      case 'HealthCheck':
        return (
          <>
            <Field
              label='HealthCheckRating'
              min={0}
              max={4}
              name={'healthCheckRating'}
              component={NumberField}
            />
          </>
        )
      case 'Hospital':
        return (
          <>
            <Field
              label='Criteria'
              name='discharge.criteria'
              placeholder='Criteria'
              component={TextField}
            />
            <Field label='Date' name='discharge.date' component={DateField} />
          </>
        )
      case 'OccupationalHealthcare':
        return (
          <>
            <Field
              label='EmployerName'
              name='employerName'
              placeholder='EmployerName'
              component={TextField}
            />
            <Field
              label='StartDate'
              name='sickLeave.startDate'
              component={DateField}
            />
            <Field
              label='EndDate'
              name='sickLeave.endDate'
              component={DateField}
            />
          </>
        )
      default:
        break
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is missing'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        return errors
      }}>
      {({ setFieldValue, setFieldTouched, isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <SelectType
              setFieldValue={setFieldValue}
              onChange={onChange}
              label='Type'
              name='type'
              options={typeOptions}
            />
            <DiagnosisSelection
              diagnoses={diagnosisOptions}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field label='Date' name='date' component={DateField} />
            {renderBody()}
            <Grid>
              <Grid.Column floated='left'>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right'>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
