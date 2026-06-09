import { toast } from "react-toastify";

export const handleError = (error: unknown, fallbackMessage: string): void => {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(fallbackMessage);
  }
};