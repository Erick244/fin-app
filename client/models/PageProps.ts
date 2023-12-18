export interface PageProps {
    searchParams: SearchParams;
}

export interface SearchParams {
    query?: string;
    page?: string;
    target?: TargetParam;
}

export enum TargetParam {
    description = "description",
    transactionDate = "transactionDate",
    amount = "amount",
    all = "all",
}
