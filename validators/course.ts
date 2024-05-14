// import { z } from "zod";

// export const createChaptersSchema = z.object({
//   title: z.string().min(3).max(100),
//   units: z.array(z.string()),
// });
import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(250, { message: "Title must be at most 100 characters long" }),
  units: z.array(z.string().min(1, { message: "Unit must not be empty" })),
});
