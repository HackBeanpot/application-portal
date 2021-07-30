import { User } from './types'
import Axios from 'axios'

const host = 'https://application-portal.vercel.app'
export function getAdminById(id: number) {
  return Axios.get<User>(`/v1/admin/${id}`, { baseURL: host })
}

export function updateAdminById(id: number, user: User) {
  Axios.post(`/api/v1/admin/${id}`, user, { baseURL: host })
}

export function getAllAdmins() {
  return Axios.get<Array<User>>(`/api/v1/admin`, { baseURL: host })
}

export function getApplicantById(id: number) {
  return Axios.get<User>(`/api/v1/applicants/${id}`, { baseURL: host })
}

export function updateApplicantById(id: number, user: User) {
  Axios.post(`/api/v1/applicants/${id}`, user, { baseURL: host })
}

export function getAllApplicants() {
  return Axios.get<Array<User>>(`/api/v1/applicants`, { baseURL: host })
}

export function getWelcome() {
  return Axios.get<string>(`/api/v1/welcome`, { baseURL: host })
}

const welcomeMessage = ''
export function postWelcome() {
  Axios.post(`/api/v1/welcome`, welcomeMessage, { baseURL: host })
}

// status functions need bearer token
