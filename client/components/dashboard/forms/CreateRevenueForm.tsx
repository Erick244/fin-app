"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const createRevenueFormSchema = z
    .object({
        amount: z
            .any()
            .refine(
                (value) => {
                    const parsedNumber = parseFloat(value);
                    return !isNaN(parsedNumber) && parsedNumber > 0;
                },
                {
                    message: "The value must be greater than 0",
                }
            )
            .transform((value) => parseFloat(value)),
        description: z.string().min(3).max(150),
        isPaid: z.boolean(),
        transactionDate: z.date().nullable(),
    })
    .refine(
        ({ isPaid, transactionDate }) => {
            if (isPaid) {
                const existTransactionDate = !!transactionDate;
                return existTransactionDate;
            }
            return true;
        },
        {
            message:
                "The transaction date is required when the 'Payment State' is 'Paid'",
            path: ["transactionDate"],
        }
    );

type CreateRevenueData = z.infer<typeof createRevenueFormSchema>;

export function CreateRevenueForm() {
    const form = useForm<CreateRevenueData>({
        resolver: zodResolver(createRevenueFormSchema),
        defaultValues: {
            amount: 0,
            description: "",
            isPaid: false,
            transactionDate: null,
        },
    });

    function onSubmit(data: CreateRevenueData) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Amount of revenue..."
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isPaid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={false}
                                            id="not-paid"
                                        />
                                        <Label htmlFor="not-paid">
                                            Not Paid
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={true}
                                            id="paid"
                                        />
                                        <Label htmlFor="paid">Paid</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.getValues("isPaid") && (
                    <FormField
                        control={form.control}
                        name="transactionDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Transaction Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-1/2 pl-3 text-left font-normal text-ellipsis overflow-hidden ",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value ?? undefined}
                                            onSelect={field.onChange}
                                            disabled={disableCalender}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Amount of revenue..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="flex items-center gap-2">
                    <span>Create</span> <Plus className="w-4 h-4" />
                </Button>
            </form>
        </Form>
    );
}

function disableCalender(date: Date) {
    return date < new Date("1900-01-01");
}
