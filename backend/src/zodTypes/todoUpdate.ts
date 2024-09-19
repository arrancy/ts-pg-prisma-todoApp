import zod from "zod";
export const todoUpdateSchema = zod
  .object({
    id: zod.number(),
    title: zod.string().min(1).optional(),
    description: zod.string().optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.description !== undefined,
    {
      message: "provide title or description",

      path: ["title", "description"],
    }
  );
