export interface Revenue {
    id: number;
    amount: number;
    description: string;
    isPaid: boolean;
    transactionDate: Date | null;
}
