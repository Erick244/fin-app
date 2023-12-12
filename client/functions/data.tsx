import { format } from "date-fns";

export function extractSimpleDateFromIsoDate(isoDate: Date | null) {
    if (!isoDate) return;

    const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])/g; //extract the first part <2023-12-13>T03:00:00.000+00:00
    const simpleDate = new Date(
        isoDate.toString().match(dateRegex)?.[0] || isoDate
    );

    return simpleDate;
}

export function extractFormatedDateFromIsoDate(isoDate: Date | null) {
    if (!isoDate) return;

    return format(
        extractSimpleDateFromIsoDate(isoDate) || new Date(isoDate),
        "PPP"
    );
}
