import zod from "zod";
export const signupSchema = zod.object({
  username: zod.string().min(1).max(250),
  password: zod.string().min(6).max(250),
  firstName: zod.string().min(1).max(250),
  lastName: zod.string().min(1).max(250),
});
