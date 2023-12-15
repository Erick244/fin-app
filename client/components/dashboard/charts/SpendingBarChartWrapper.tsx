import { getData } from "@/functions/api";
import { transformSpendingAmountToRealValue } from "@/functions/data";
import { SpendingChartData } from "@/models/SpendingChartData";
import { HTMLAttributes } from "react";
import { SpendingBarChart } from "./SpendingBarChart";

export async function SpendingBarChartWrapper(
    props: HTMLAttributes<HTMLDivElement>
) {
    const data = await getData<SpendingChartData[]>(
        "/revenues/sevenMonthsChart"
    );

    return (
        <SpendingBarChart
            data={transformSpendingAmountToRealValue(data)}
            {...props}
        />
    );
}
