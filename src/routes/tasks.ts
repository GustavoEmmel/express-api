import { Router } from "express";
import { Task } from "../types/task";
import { validateSchema } from "../middleware/validateSchema";
import { TaskSchema, TaskUpdateSchema } from "../schemas/task";

const router = Router();

const tasks: Task[] = [];
let id = 1;

router.get("/", (_, res) => {
  res.json(tasks);
});

router.post("/", validateSchema(TaskSchema), (req, res) => {
  const { title, completed } = req.body;

  const task: Task = {
    id: id++,
    title: title,
    completed: completed,
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.put("/:id", validateSchema(TaskUpdateSchema), (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };

  res.json(tasks[taskIndex]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

export default router;
