import { z } from "zod";
export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
});