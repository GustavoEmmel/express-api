import { z } from "zod";

export const TaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    completed: z.boolean(),
  })
  .strict();

export const TaskUpdateSchema = TaskSchema.partial().strict();
