import * as z from "zod";

export const contactFormSchema = z.object({
    email: z.string().email(),
    message: z.string().min(10).max(250),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
