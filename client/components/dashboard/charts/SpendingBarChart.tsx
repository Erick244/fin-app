"use client";
import { SpendingChartData } from "@/models/SpendingChartData";
import { HTMLAttributes } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface SpendingBarChartProps extends HTMLAttributes<HTMLDivElement> {
    data: SpendingChartData[];
}

export function SpendingBarChart({ data, ...rest }: SpendingBarChartProps) {
    return (
        <div {...rest} className="w-full h-full">
            <h1 className="sm:text-4xl text-3xl text-center mb-6">
                Monthly Expenses
            </h1>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid className="stroke-foreground/20" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip
                        separator=": $"
                        wrapperClassName="dark:text-background text-foreground font-semibold"
                    />
                    <Bar
                        className="fill-foreground"
                        dataKey="Bigger"
                        animationDuration={1500}
                        activeBar={
                            <Rectangle className="fill-background stroke-foreground" />
                        }
                    />
                    <Bar
                        className="fill-foreground"
                        dataKey="Lower"
                        animationDuration={1500}
                        activeBar={
                            <Rectangle className="fill-background stroke-foreground" />
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
