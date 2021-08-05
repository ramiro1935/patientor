import { State } from './state'
import { Entry, Patient } from '../types'

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'UPDATE_PATIENT'
      payload: Patient
    }
  | {
      type: 'ADD_ENTRY'
      payload: {
        entry: Entry[]
        id: string
      }
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...action.payload,
            ...state.patients[action.payload.id],
          },
        },
      }
    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...action.payload.entry,
            ],
          },
        },
      }
    default:
      return state
  }
}

export const setPatientList = (patients: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patients }
}

export const updatePatient = (patient: Patient): Action => {
  return { type: 'UPDATE_PATIENT', payload: patient }
}

export const addNewEntry = (entry: Entry[], id: string): Action => {
  return { type: 'ADD_ENTRY', payload: { entry, id } }
}
