"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskHeaderProps {
  taskCount: number;
  completedCount: number;
  onCreateClick: () => void;
}

export const TaskHeader = memo(function TaskHeader({
  taskCount,
  completedCount,
  onCreateClick,
}: TaskHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-balance">
          Mis Tareas
        </h1>
        <p className="text-muted-foreground">
          {taskCount === 0
            ? "No tienes tareas pendientes"
            : `${completedCount} de ${taskCount} completadas`}
        </p>
      </div>
      <Button
        onClick={onCreateClick}
        size="lg"
        className="h-12 px-6 gap-2 font-medium shadow-lg bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
      >
        <Plus className="h-5 w-5" />
        Nueva Tarea
      </Button>
    </div>
  );
});
