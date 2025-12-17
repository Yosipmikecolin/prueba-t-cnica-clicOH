import axios, { AxiosError } from "axios";

/* ---------------- CONFIGURACION DE AXIOS ---------------- */
export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------- CLASE DE ERROR ---------------- */
class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

/* ---------------- MANEJADOR DE ERRORES ---------------- */
export function handleAxiosError(
  error: unknown,
  fallbackMessage: string
): never {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    throw new ApiError(
      err.response?.data?.message || fallbackMessage,
      err.response?.status
    );
  }
  throw new ApiError(fallbackMessage);
}
