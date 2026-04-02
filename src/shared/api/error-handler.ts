import { isAxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { ApiErrorResponse } from "./api-types";
import { toast } from "sonner";

export const handleApiError = (error: unknown, form?: UseFormReturn<any>) => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    if (!error.response) {
      toast.error("Network error", {
        description: "The server is unavaliable. Please, try again later.",
      });
      console.error("Network/CORS Error:", error.message);
      return;
    }
    
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 400 && data?.errors && form) {
      Object.entries(data.errors).forEach(([field, message]) => {
        form.setError(field, { type: "server", message });
      });
      toast.error("Error in form values", {
        description: "Please, check highlighted fields.",
      });
      return;
    }

    if (status === 401) {
      toast.error("", {
        description: data?.message,
      })
      return;
    }

    if (status === 409) {
      toast.error("Registration failed!", {
        description: data?.message,
      })
      return;
    }

    if (data?.message) {
      toast.error("Error", { description: data.message });
      return;
    }

    toast.error("System error", {
      description: `Server returned code ${status}`,
    });
  } else {
    toast.error("Application error", {
      description: "Something got happened.",
    });
    console.error(error);
  }
}