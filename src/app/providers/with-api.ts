import { api } from "@/shared/api/base"
import { toast } from "sonner";


export const setupApiInterceptors = (navigate: (path: string) => void) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigate('/login');
        toast.error("Session was expired, re-login");
      }
      return Promise.reject(error);
    }
  )
}