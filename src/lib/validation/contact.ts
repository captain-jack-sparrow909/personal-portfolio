import { z } from "zod";

import { projectTypeValues } from "./contact-options";

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer.")
    .transform((value) => value.toLowerCase()),
  company: z
    .string()
    .trim()
    .max(120, "Company must be 120 characters or fewer.")
    .optional()
    .default(""),
  projectType: z.enum(projectTypeValues, {
    error: "Please select a project type.",
  }),
  message: z
    .string({ error: "Please share a little about the project." })
    .trim()
    .min(20, "Please share at least 20 characters about the project.")
    .max(4000, "Message must be 4,000 characters or fewer."),
  website: z.string().trim().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactResponse =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<ContactField, string[]>>;
    };
