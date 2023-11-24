"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
    email: z.string().email(),
    message: z.string().min(10).max(250),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm(props: HTMLAttributes<HTMLFormElement>) {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    });

    function onSubmit(data: ContactFormData) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Contact e-mail..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You will receive the response in this e-mail.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Your message..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Write what is happening.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
