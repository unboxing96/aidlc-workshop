import api from './api';
import type { LoginRequest, LoginResponse, MessageResponse } from '../types';

export const adminAuthApi = {
  register: (data: LoginRequest) => api.post<MessageResponse>('/admin/register', data),
  login: (data: LoginRequest) => api.post<LoginResponse>('/admin/login', data),
};
