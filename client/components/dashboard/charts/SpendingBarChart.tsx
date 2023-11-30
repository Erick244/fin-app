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
        Spent: 2400,
    },
    {
        name: "Feb",
        Spent: 1398,
    },
    {
        name: "Mar",
        Spent: 9800,
    },
    {
        name: "Apr",
        Spent: 3908,
    },
    {
        name: "May",
        Spent: 4800,
    },
    {
        name: "Jun",
        Spent: 3800,
    },
    {
        name: "Jui",
        Spent: 4300,
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
                    <Tooltip wrapperClassName="dark:text-background text-foreground font-semibold" />
                    <Bar
                        className="fill-foreground"
                        dataKey="Spent"
                        activeBar={
                            <Rectangle className="fill-background stroke-foreground" />
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
