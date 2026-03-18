import api from './api';
import type { AdminLoginRequest, AdminRegisterRequest, AdminLoginResponse, MessageResponse } from '../types';

export const adminAuthApi = {
  register: (data: AdminRegisterRequest) =>
    api.post<MessageResponse>('/admin/register', data),

  login: (data: AdminLoginRequest) =>
    api.post<AdminLoginResponse>('/admin/login', data),
};
