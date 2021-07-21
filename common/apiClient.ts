import { User } from './types'
import Axios from 'axios'

const host = 'https://application-portal.vercel.app'
export function getAdminById(id: number) {
  return Axios.get<User>(`/v1/applicants/${id}`, { baseURL: host })
}
