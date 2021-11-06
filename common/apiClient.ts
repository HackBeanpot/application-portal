import {
  StatusApiResponse,
  RegistrationApiRequest,
  User,
  DatesApiResponse,
} from './types';
import Axios, { AxiosResponse } from 'axios';

export function getAdminById(id: number) {
  return Axios.get<User>(`/api/v1/admin/${id}`);
}

export function updateAdminById(id: number, user: User) {
  Axios.post(`/api/v1/admin/${id}`, user);
}

export function getAllAdmins() {
  return Axios.get<Array<User>>(`/api/v1/admin`);
}

export const getUser = (): Promise<AxiosResponse<User>> =>
  Axios.get(`/api/v1/user`);

export function updateApplicantById(id: number, user: User) {
  Axios.post(`/api/v1/applicants/${id}`, user);
}

export const updateApplicantResponses = (
  responses: RegistrationApiRequest
): Promise<AxiosResponse<string | null>> =>
  Axios.post(`/api/v1/registration`, responses, { validateStatus: () => true });

export function getAllApplicants() {
  return Axios.get<Array<User>>(`/api/v1/applicants`);
}

export function getStatus(): Promise<AxiosResponse<StatusApiResponse>> {
  return Axios.get(`/api/v1/status`);
}

export function getConfirmBy(): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.get(`/api/v1/dates/confirm-by`);
}

export function getRegistrationClosed(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-closed`);
}

export function getRegistrationOpen(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-open`);
}
