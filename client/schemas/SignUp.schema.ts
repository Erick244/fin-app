import * as z from "zod";

const signUpFormSchema = z
    .object({
        name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine(
        ({ password, confirmPassword }) => {
            return password === confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export { signUpFormSchema };
export type { SignUpFormData };
