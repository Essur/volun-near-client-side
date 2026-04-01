import { LoginFormValues } from "../model/login-schemas";
import { OrganizationFormValues, VolunteerFormValues } from "../model/register-schemas";
import { api } from '@/shared/api/base';

export const authService = {
  async initCsrf() {
    await api.get('/auth/csrf')
  },

  async registerVolunteer(data: VolunteerFormValues) {
    const response = await api.post('/auth/register/volunteer', data);
    return response.data;
  },

  async registerOrganization(data: OrganizationFormValues) {
    const response = await api.post('/auth/register/organization', data);
    return response.data;
  },

  async login(data: LoginFormValues) {
    const response = await api.post('/auth/login', data);
    return response.data;
  }
}