import axios from "axios"
import { EntryFormValues } from "../AddEntryModal/AddEntryForm"
import { PatientFormValues } from "../AddPatientModal/AddPatientForm"
import { apiBaseUrl } from "../constants"
import { Patient } from "../types"


const getPatientById = async (id: string): Promise<Patient> => {
    const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
    return res.data
}


const newPatient = async (values: PatientFormValues) : Promise<Patient> => {
    const res = await axios.post<Patient>(`${apiBaseUrl}/patients`, values)
    return res.data
}

const newPatientEntry = async (values: EntryFormValues, id: string) : Promise<Patient> => {
    const res = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values)
    return res.data
}

export default {
    getPatientById,
    newPatient,
    newPatientEntry
}