import * as z from "zod";

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
