import { z } from "zod";

export const MenuItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.string().or(z.number()),
  category: z.string(),
  photo: z.string().optional(),
  notes: z.string().optional(),
});
export type TMenuItem = z.infer<typeof MenuItem>;