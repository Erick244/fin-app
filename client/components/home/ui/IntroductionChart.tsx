"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

export function IntroductionChart() {
    const data = [
        {
            name: "A",
            business: 0,
        },
        {
            name: "B",
            business: 200,
        },
        {
            name: "C",
            business: 300,
        },
        {
            name: "D",
            business: 800,
        },
    ];

    return (
        <ResponsiveContainer width="80%" height="50%">
            <LineChart
                width={400}
                height={300}
                data={data}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="linear" dataKey="business" stroke="#fff" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    );
}
