import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskDialog } from "../components/task-dialog";

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <h2>{children}</h2>,
  DialogDescription: ({ children }: any) => <p>{children}</p>,
}));

describe("Task-dialog", () => {
  const setup = (props = {}) => {
    const onSave = jest.fn().mockResolvedValue(true);
    const onOpenChange = jest.fn();

    render(
      <TaskDialog
        open
        mode="create"
        onSave={onSave}
        onOpenChange={onOpenChange}
        {...props}
      />
    );

    return { onSave, onOpenChange };
  };

  it("renderiza el título de creación", () => {
    setup();
    expect(screen.getByText("Nueva Tarea")).toBeInTheDocument();
  });

  it("no permite guardar si los campos están vacíos", async () => {
    setup();
    const button = screen.getByRole("button", { name: /crear/i });
    expect(button).toBeDisabled();
  });

  it("guarda la tarea correctamente", async () => {
    const user = userEvent.setup();
    const { onSave, onOpenChange } = setup();

    await user.type(screen.getByLabelText("Título"), "Tarea de prueba");
    await user.type(
      screen.getByLabelText("Descripción"),
      "Descripción de prueba"
    );

    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(onSave).toHaveBeenCalledWith(
      "Tarea de prueba",
      "Descripción de prueba"
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("restaura valores al cancelar en modo edición", async () => {
    const user = userEvent.setup();
    const task = {
      _id: "1",
      title: "Original",
      description: "Texto original",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { onOpenChange } = setup({
      mode: "edit",
      task,
    });

    await user.clear(screen.getByLabelText("Título"));
    await user.type(screen.getByLabelText("Título"), "Cambio");

    await user.click(screen.getByText("Cancelar"));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("actualiza los campos cuando cambian los props", () => {
    const { rerender } = render(
      <TaskDialog
        open={true}
        mode="create"
        onSave={jest.fn()}
        onOpenChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText("Título")).toHaveValue("");

    const task = {
      _id: "1",
      title: "Nueva Info",
      description: "Nueva Desc",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    rerender(
      <TaskDialog
        open={true}
        mode="edit"
        task={task}
        onSave={jest.fn()}
        onOpenChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText("Título")).toHaveValue("Nueva Info");
    expect(screen.getByLabelText("Descripción")).toHaveValue("Nueva Desc");
  });
});
