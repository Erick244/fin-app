import { getData } from "@/functions/api";
import { SpendingChartData } from "@/models/SpendingChartData";
import { HTMLAttributes } from "react";
import { SpendingBarChart } from "./SpendingBarChart";

export async function SpendingBarChartWrapper(
    props: HTMLAttributes<HTMLDivElement>
) {
    const data = await getData<SpendingChartData[]>(
        "/revenues/sevenMonthsChart"
    );

    const spendingDataFormated = data.map((spending) => {
        spending.Bigger /= 1000;
        spending.Lower /= 1000;

        return spending;
    });

    return <SpendingBarChart data={spendingDataFormated} {...props} />;
}
