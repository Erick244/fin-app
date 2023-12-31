"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { SignInFormData, signInFormSchema } from "@/schemas/SignIn.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function SignInForm() {
    const { form, isSubmitting, onSubmit } = useSignInForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Your email..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Your strong password..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {isSubmitting ? <Spinner /> : "Enter"}
                </Button>
            </form>
        </Form>
    );
}

function useSignInForm() {
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { login } = useAuthContext();

    async function onSubmit(data: SignInFormData) {
        await login(data);
    }

    const isSubmitting = form.formState.isSubmitting;

    return {
        form,
        onSubmit,
        isSubmitting,
    };
}
