import zod from "zod";
export const todoDeleteSchema = zod.object({
  id: zod.number(),
});
