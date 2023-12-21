import * as z from "zod";

export const createRevenueFormSchema = z
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
            .transform((value) => parseFloat(value) * 1000),
        description: z.string().min(3).max(150),
        isPaid: z.any().transform((value) => Boolean(value)),
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
    )
    .transform((data) => {
        if (!data.isPaid) {
            data.transactionDate = null;
        }

        return data;
    });

export type CreateRevenueData = z.infer<typeof createRevenueFormSchema>;
