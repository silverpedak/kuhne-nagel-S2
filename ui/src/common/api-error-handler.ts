import { AxiosError } from "axios";

import { alerts } from "@/views/components/feedback";

export const handleError = (err: unknown) => {
  let message = "Unknown error";
  const error = err as Error | AxiosError;
  if (error) message = error.message;
  alerts.errorAlert(message, "Attention");
};
