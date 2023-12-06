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
import { useToast } from "@/components/ui/use-toast";
import { postData } from "@/functions/api";
import { SignUpFormData, signUpFormSchema } from "@/schemas/SignUp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignUpForm() {
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            confirmPassword: "",
            password: "",
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    async function onSubmit(data: SignUpFormData) {
        try {
            setLoading(true);
            await postData("/auth/signup", data);
            router.push("/auth/login");

            toast({
                title: "Success",
                description: "Account created successfully!",
            });
        } catch (e: any) {
            const errorMessage = String(e.message);

            toast({
                title: errorMessage,
                description: "Try using another e-mail.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your name or nickname..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                {form.getValues("password") && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="w-full">
                    {loading ? <Spinner className="w-6 h-6" /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
