"use client";

import { memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/interfaces/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskCard = memo(function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  const handleToggle = useCallback(() => {
    onToggleComplete(task._id, !task.completed);
  }, [task._id, task.completed, onToggleComplete]);

  const handleEdit = useCallback(() => {
    onEdit(task);
  }, [task, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(task._id);
  }, [task._id, onDelete]);

  return (
    <Card className="group relative overflow-hidden border border-border bg-card transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 cursor-pointer"
            aria-label="Marcar tarea como completada"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-medium leading-tight mb-2 ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-card-foreground"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm leading-relaxed ${
                  task.completed
                    ? "text-muted-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {task.description}
              </p>
            )}
            <time className="text-xs text-muted-foreground mt-3 block">
              {new Date(task.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex gap-1 ">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="h-9 w-9 text-muted-foreground hover:bg-blue-500"
              aria-label="Editar tarea"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-9 w-9 text-muted-foreground hover:bg-red-500"
              aria-label="Eliminar tarea"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
});
