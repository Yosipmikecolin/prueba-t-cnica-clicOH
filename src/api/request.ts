import type { Task } from "@/interfaces/task";
import { axiosConfig, handleAxiosError } from "./config";

/* ---------------- API ---------------- */
export const tasksApi = {
  async getAll(): Promise<Task[]> {
    try {
      const { data } = await axiosConfig.get<Task[]>("/tasks");
      return data;
    } catch (error) {
      handleAxiosError(error, "Error al cargar las tareas");
    }
  },

  async create(task: Omit<Task, "_id" | "createdAt">): Promise<Task> {
    try {
      const { data } = await axiosConfig.post<Task>("/tasks", task);
      return data;
    } catch (error) {
      handleAxiosError(error, "Error al crear la tarea");
    }
  },

  async update(id: string, task: Partial<Task>): Promise<Task> {
    try {
      const { data } = await axiosConfig.put<Task>(`/tasks/${id}`, task);
      return data;
    } catch (error) {
      handleAxiosError(error, "Error al actualizar la tarea");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await axiosConfig.delete(`/tasks/${id}`);
    } catch (error) {
      handleAxiosError(error, "Error al eliminar la tarea");
    }
  },

  async toggleComplete(id: string, completed: boolean): Promise<Task> {
    try {
      const { data } = await axiosConfig.put<Task>(`/tasks/${id}`, {
        completed,
      });
      return data;
    } catch (error) {
      handleAxiosError(error, "Error al actualizar el estado de la tarea");
    }
  },
};
