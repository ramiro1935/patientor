import React from 'react'
import { Entry } from '../../types'
import { HealthCheckEntry, HospitalEntry, OccupationalEntry } from './Entries'

interface IListEntries {
  entries?: Entry[] | null
}

const ListEntries = ({ entries }: IListEntries) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  if (!entries || entries.length == 0) return null

  const getAllEntries = () => {
    return entries.map((entry: Entry) => {
      switch (entry.type) {
        case 'Hospital':
          return <HospitalEntry key={entry.id} {...entry} />
        case 'OccupationalHealthcare':
          return <OccupationalEntry key={entry.id} {...entry} />
        case 'HealthCheck':
          return <HealthCheckEntry key={entry.id} {...entry} />
        default:
          return assertNever(entry)
      }
    })
  }
  return <>{getAllEntries()}</>
}

export default ListEntries
