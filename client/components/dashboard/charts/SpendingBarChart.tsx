"use client";
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

const data = [
    {
        name: "Jan",
        Bigger: 2400,
        Lower: 1400,
    },
    {
        name: "Feb",
        Bigger: 1398,
        Lower: 100,
    },
    {
        name: "Mar",
        Bigger: 9800,
        Lower: 1020,
    },
    {
        name: "Apr",
        Bigger: 3908,
        Lower: 999.4,
    },
    {
        name: "May",
        Bigger: 4800,
        Lower: 299,
    },
    {
        name: "Jun",
        Bigger: 3800,
        Lower: 399,
    },
    {
        name: "Jui",
        Bigger: 4300,
        Lower: 259,
    },
];

export function SpendingBarChart(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className="w-full h-full">
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
                    <XAxis dataKey="name" />
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
