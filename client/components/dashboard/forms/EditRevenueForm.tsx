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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { patchData } from "@/functions/api";
import {
    extractFormatedDateFromIsoDate,
    extractSimpleDateFromIsoDate,
} from "@/functions/data";
import { cn } from "@/lib/utils";
import { Revenue } from "@/models/Revenue";
import {
    EditRevenueData,
    editRevenueFormSchema,
} from "@/schemas/EditRevenue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface EditRevenueFormProps {
    revenue: Revenue;
}

export function EditRevenueForm({ revenue }: EditRevenueFormProps) {
    const { form, isSubmitting, onSubmit } = useEditRevenueForm(revenue);

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
                                                    extractFormatedDateFromIsoDate(
                                                        field.value
                                                    )
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
                    {isSubmitting ? (
                        <Spinner />
                    ) : (
                        <>
                            <span>Edit</span> <Edit className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}

function useEditRevenueForm(revenue: Revenue) {
    const form = useForm<EditRevenueData>({
        resolver: zodResolver(editRevenueFormSchema),
        defaultValues: {
            ...revenue,
            transactionDate:
                extractSimpleDateFromIsoDate(revenue.transactionDate) || null,
            amount: revenue.amount / 1000,
        },
    });

    const router = useRouter();

    async function onSubmit(data: EditRevenueData) {
        try {
            const revenueId = revenue.id;
            await patchData(`/revenues/edit/${revenueId}`, data);

            router.refresh();
            toast({
                title: "Success",
                description: `RVN${revenueId} edited.`,
                duration: 2000,
            });
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
            });
        }
    }

    const isSubmitting = form.formState.isSubmitting;

    return {
        isSubmitting,
        onSubmit,
        form,
    };
}

function disableCalender(date: Date) {
    return date < new Date("1900-01-01");
}
