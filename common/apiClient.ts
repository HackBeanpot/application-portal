import { User } from './types'
import Axios from 'axios'

const host = 'https://application-portal.vercel.app'
export function getAdminById(id: number) {
  return Axios.get<User>(`/v1/admin/${id}`, { baseURL: host })
}

export function updateAdminById(id: number, user: User) {
  Axios.post(`/v1/admin/${id}`, user, { baseURL: host })
}

export function getAllAdmins() {
  return Axios.get<Array<User>>(`/v1/admin`, { baseURL: host })
}

export function getApplicantById(id: number) {
  return Axios.get<User>(`/v1/applicants/${id}`, { baseURL: host })
}

// do we need to take in body parameters separately
export function updateApplicantById(id: number, user: User) {
  Axios.post(`/v1/applicants/${id}`, user, { baseURL: host })
}

export function getAllApplicants() {
  return Axios.get<Array<User>>(`/v1/applicants`, { baseURL: host })
}

export function updateLogin(email: string, password: string) {
  Axios.post(
    `/v1/login`,
    {
      email: email,
      password: password,
    },
    { baseURL: host }
  )
}

// status functions need bearer token
