"use client";

import { useState, useCallback, useMemo } from "react";
import { TaskHeader } from "@/components/task-header";
import { TaskFilters, type FilterType } from "@/components/task-filters";
import { TaskList } from "@/components/task-list";
import { TaskDialog } from "@/components/task-dialog";
import { useTaskStore, type Task } from "@/interfaces/task";
import { Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";

export function TasksPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const { tasks, createTask, editTask, removeTask, toggleTaskComplete } =
    useTasks();
  const { isLoading } = useTaskStore();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  const handleCreateClick = useCallback(() => {
    setDialogMode("create");
    setEditingTask(null);
    setDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((task: Task) => {
    setDialogMode("edit");
    setEditingTask(task);
    setDialogOpen(true);
  }, []);

  const handleSave = useCallback(
    async (title: string, description: string) => {
      if (dialogMode === "create") {
        return await createTask(title, description);
      } else if (editingTask) {
        return await editTask(editingTask._id, title, description);
      }
      return false;
    },
    [dialogMode, editingTask, createTask, editTask]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <TaskHeader
            taskCount={tasks.length}
            completedCount={counts.completed}
            onCreateClick={handleCreateClick}
          />

          <TaskFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditClick}
            onDelete={removeTask}
            onToggleComplete={toggleTaskComplete}
          />
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        task={editingTask}
        mode={dialogMode}
      />
    </>
  );
}

export default TasksPage;
