import {
  StatusApiResponse,
  RegistrationApiRequest,
  User,
  DatesApiResponse,
  TeamApiResponse,
  RegistrationApiResponse,
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

export const getApplicantResponses = (): Promise<
  AxiosResponse<RegistrationApiResponse>
> => Axios.get('/api/v1/registration');

export const updateApplicantResponses = (
  responses: RegistrationApiRequest
): Promise<AxiosResponse<string | null>> =>
  Axios.post(`/api/v1/registration`, responses, { validateStatus: () => true });

export function getAllApplicants() {
  return Axios.get<Array<User>>(`/api/v1/applicants`);
}

export function getStats() {
  return Axios.get('/api/v1/stats');
}

export function getStatus(): Promise<AxiosResponse<StatusApiResponse>> {
  return Axios.get(`/api/v1/status`);
}

export function getConfirmBy(): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.get(`/api/v1/dates/confirm-by`);
}

export function updateConfirmBy(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/confirm-by`, { date });
}

export function getRegistrationClosed(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-closed`);
}

export function updateRegistrationClosed(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/registration-closed`, { date });
}

export function getRegistrationOpen(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-open`);
}

export function updateRegistrationOpen(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/registration-open`, { date });
}

export function getTeamInfo(
  teamName: string | null
): Promise<AxiosResponse<TeamApiResponse>> {
  return Axios.get(`/api/v1/team`, {
    params: {
      teamName,
    },
  });
}

export function updateTeamInfo(
  teamName: string,
  email: string
): Promise<AxiosResponse<undefined>> {
  return Axios.post(`/api/v1/team`, { teamName, email });
}

export function deleteTeamInfo(
  teamName: string,
  email: string
): Promise<AxiosResponse<undefined>> {
  return Axios.delete(`/api/v1/team`, {
    data: {
      teamName,
      email,
    },
  });
}
