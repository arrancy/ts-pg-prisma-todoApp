import zod from "zod";
export const signinSchema = zod.object({
  username: zod.string().min(1).max(250),
  password: zod.string().min(6).max(250),
});
