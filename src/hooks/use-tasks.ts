"use client";

import { useCallback, useEffect } from "react";
import { useTaskStore } from "@/interfaces/task";
import toast from "react-hot-toast";
import { tasksApi } from "@/api/request";

export function useTasks() {
  const {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    setError,
  } = useTaskStore();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al cargar las tareas";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [setTasks, setLoading, setError]);

  const createTask = useCallback(
    async (title: string, description: string) => {
      try {
        const newTask = await tasksApi.create({
          title,
          description,
          completed: false,
        });
        addTask(newTask);
        toast.success("Tarea creada exitosamente");
        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Error al crear la tarea";
        toast.error(message);
        return false;
      }
    },
    [addTask]
  );

  const editTask = useCallback(
    async (id: string, title: string, description: string) => {
      try {
        const updated = await tasksApi.update(id, { title, description });
        updateTask(id, updated);
        toast.success("Tarea actualizada exitosamente");
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Error al actualizar la tarea";
        toast.error(message);
        return false;
      }
    },
    [updateTask]
  );

  const removeTask = useCallback(
    async (id: string) => {
      try {
        await tasksApi.delete(id);
        deleteTask(id);
        toast.success("Tarea eliminada exitosamente");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Error al eliminar la tarea";
        toast.error(message);
      }
    },
    [deleteTask]
  );

  const toggleTaskComplete = useCallback(
    async (id: string, completed: boolean) => {
      try {
        const updated = await tasksApi.toggleComplete(id, completed);
        updateTask(id, updated);
        toast.success(
          completed ? "Tarea completada" : "Tarea marcada como pendiente"
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Error al actualizar la tarea";
        toast.error(message);
      }
    },
    [updateTask]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    createTask,
    editTask,
    removeTask,
    toggleTaskComplete,
    refreshTasks: fetchTasks,
  };
}
