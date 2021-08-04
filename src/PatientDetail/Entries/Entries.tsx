import React from 'react'
import CardEntry, { ICardEntryIcon } from '../../components/CardEntry'
import {
  Color,
  HealthCheckEntry as IHealthCheckEntry,
  HospitalEntry as IHospitalEntry,
  OccupationalHealthcareEntry as IOccupationalHealthcareEntry,
} from '../../types'

const mapRatingToColor: Color = {
  0: 'green',
  1: 'yellow',
  2: 'orange',
  3: 'red',
}

export const HospitalEntry = (props: IHospitalEntry) => {
  const description = `${props.date} - ${props.type}`
  const headerInfo: ICardEntryIcon = { text: description, icon: 'doctor' }
  return (
    <CardEntry
      header={headerInfo}
      description={props.description}
      footer={null}
    />
  )
}

export const OccupationalEntry = (props: IOccupationalHealthcareEntry) => {
  const description = `${props.date} - ${props.type}`
  const headerInfo: ICardEntryIcon = { text: description, icon: 'world' }

  return (
    <CardEntry
      header={headerInfo}
      description={props.description}
      footer={null}
    />
  )
}

export const HealthCheckEntry = (props: IHealthCheckEntry) => {
  const description = `${props.date} - ${props.type}`
  const headerInfo: ICardEntryIcon = { text: description, icon: 'user' }
  const footerInfo: ICardEntryIcon = {
    text: '',
    icon: 'heart',
    color: mapRatingToColor[props.healthCheckRating],
  }
  return (
    <CardEntry
      header={headerInfo}
      description={props.description}
      footer={footerInfo}
    />
  )
}
