export interface PageProps {
    searchParams: SearchParams;
}

export interface SearchParams {
    query?: string;
    page?: string;
    target?: TargetParam;
    tableOrder?: TableOrderParam;
}

export enum TargetParam {
    description = "description",
    transactionDate = "transactionDate",
    amount = "amount",
    all = "all",
}

export enum TableOrderParam {
    revenue = "revenue",
    revenueInvert = "revenue-invert",
    date = "date",
    dateInvert = "date-invert",
    amount = "amount",
    amountInvert = "amount-invert",
    status = "status",
    statusInvert = "status-invert",
}
