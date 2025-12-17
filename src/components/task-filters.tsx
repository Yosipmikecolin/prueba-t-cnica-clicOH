"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";

export type FilterType = "all" | "active" | "completed";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilters = memo(function TaskFilters({
  currentFilter,
  onFilterChange,
  counts,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        onClick={() => onFilterChange("all")}
        className={`gap-2 ${
          currentFilter === "all"
            ? "bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 border-0"
            : ""
        }`}
      >
        Todas
        <span className="text-xs opacity-70">({counts.all})</span>
      </Button>
      <Button
        variant={currentFilter === "active" ? "default" : "outline"}
        onClick={() => onFilterChange("active")}
        className={`gap-2 ${
          currentFilter === "active"
            ? "bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0"
            : ""
        }`}
      >
        Pendientes
        <span className="text-xs opacity-70">({counts.active})</span>
      </Button>
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        onClick={() => onFilterChange("completed")}
        className={`gap-2 ${
          currentFilter === "completed"
            ? "bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0"
            : ""
        }`}
      >
        Completadas
        <span className="text-xs opacity-70">({counts.completed})</span>
      </Button>
    </div>
  );
});
