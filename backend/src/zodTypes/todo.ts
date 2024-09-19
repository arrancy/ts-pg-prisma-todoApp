import zod from "zod";
export const todoSchema = zod.object({
  title: zod.string().min(1).max(400),
  description: zod.string().optional(),
});
