"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/interfaces/task";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string, description: string) => Promise<boolean>;
  task?: Task | null;
  mode: "create" | "edit";
}

export const TaskDialog = memo(function TaskDialog({
  open,
  onOpenChange,
  onSave,
  task,
  mode,
}: TaskDialogProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === "create") {
        setTitle("");
        setDescription("");
      } else if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [open, mode, task]);

  const handleSave = useCallback(async () => {
    if (!title.trim() || !description.trim()) return;

    setIsSaving(true);
    const success = await onSave(title.trim(), description.trim());
    setIsSaving(false);

    if (success) {
      setTitle("");
      setDescription("");
      onOpenChange(false);
    }
  }, [title, description, onSave, onOpenChange]);

  const handleClose = useCallback(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    onOpenChange(false);
  }, [task, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "create" ? "Nueva Tarea" : "Editar Tarea"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los campos para crear una nueva tarea"
              : "Modifica los campos de tu tarea"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Repasar para el examen"
              className="h-11 "
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Matemáticas"
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !description.trim() || isSaving}
            className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
          >
            {isSaving
              ? "Guardando..."
              : mode === "create"
              ? "Crear"
              : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
