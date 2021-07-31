import { User } from './types'
import Axios from 'axios'

const host = 'https://application-portal.vercel.app'
export function getAdminById(id: number) {
  return Axios.get<User>(`/api/v1/admin/${id}`)
}

export function updateAdminById(id: number, user: User) {
  Axios.post(`/api/v1/admin/${id}`, user)
}

export function getAllAdmins() {
  return Axios.get<Array<User>>(`/api/v1/admin`)
}

export function getApplicantById(id: number) {
  return Axios.get<User>(`/api/v1/applicants/${id}`)
}

export function updateApplicantById(id: number, user: User) {
  Axios.post(`/api/v1/applicants/${id}`, user)
}

export function getAllApplicants() {
  return Axios.get<Array<User>>(`/api/v1/applicants`)
}

export function getWelcome() {
  return Axios.get<string>(`/api/v1/welcome`)
}

const welcomeMessage = ''
export function postWelcome() {
  Axios.post(`/api/v1/welcome`, welcomeMessage, { baseURL: host })
}

// status functions need bearer token
