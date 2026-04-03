import { LoginFormValues } from "../model/login-schemas";
import { OrganizationFormValues, VolunteerFormValues } from "../model/register-schemas";
import { api } from '@/shared/api/base';
import { AppUser } from "../../../entities/user/types";

export const authService = {
  async initCsrf() {
    await api.get('/auth/csrf')
  },

  async registerVolunteer(data: VolunteerFormValues) {
    const response = await api.post<AppUser>('/auth/register/volunteer', data);
    return response.data;
  },

  async registerOrganization(data: OrganizationFormValues) {
    const response = await api.post<AppUser>('/auth/register/organization', data);
    return response.data;
  },

  async login(data: LoginFormValues) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async fetchUser() {
    const response = await api.get<AppUser>('/auth/me');
    return response.data;
  }
}