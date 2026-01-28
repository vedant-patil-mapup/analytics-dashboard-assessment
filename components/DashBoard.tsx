"use client";

import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Card from "@/components/Card";
import ChartCard from "@/components/ChartCard";
import DataTable from "@/components/DataTable";

type Row = {
    "Model Year": string;
    Make: string;
    "Electric Vehicle Type": string;
    County: string;
    City: string;
};

export default function Dashboard() {
    const [data, setData] = useState<Row[]>([]);

    useEffect(() => {
        fetch("/Electric_Vehicle_Population_Data.csv")
            .then((res) => res.text())
            .then((text) => {
                const parsed = Papa.parse<Row>(text, {
                    header: true,
                    skipEmptyLines: true,
                });
                setData(parsed.data);
            });
    }, []);


    const totalVehicles = data.length;

    const byYear = useMemo(() => {
        const map: Record<string, number> = {};
        data.forEach((d) => {
            map[d["Model Year"]] = (map[d["Model Year"]] || 0) + 1;
        });

        return Object.entries(map)
            .map(([year, count]) => ({ year, count }))
            .sort((a, b) => +a.year - +b.year);
    }, [data]);

    const byMake = useMemo(() => {
        const map: Record<string, number> = {};
        data.forEach((d) => {
            map[d.Make] = (map[d.Make] || 0) + 1;
        });

        return Object.entries(map)
            .map(([make, count]) => ({ make, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [data]);

    // console.log(data , "dfsjhgafjdhsag");


    const byType = useMemo(() => {
        const map: Record<string, number> = {};
        data.forEach((d) => {
            map[d["Electric Vehicle Type"]] =
                (map[d["Electric Vehicle Type"]] || 0) + 1;
        });

        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [data]);

    const byCounty = useMemo(() => {
        const map: Record<string, number> = {};
        data.forEach((d) => {
            map[d.County] = (map[d.County] || 0) + 1;
        });

        return Object.entries(map)
            .map(([county, count]) => ({ county, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [data]);

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

    const coloredTypeData = byType.map((d, i) => ({
        ...d,
        fill: colors[i % colors.length],
    }));

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold"> EV Population Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <Card title="Total Vehicles" value={totalVehicles} />
                <Card title="Unique Makes" value={new Set(data.map((d) => d.Make)).size} />
                <Card
                    title="Unique Cities"
                    value={new Set(data.map((d) => d.City)).size}
                />
            </div>


            <div className="grid lg:grid-cols-2 gap-8">

                <ChartCard title="EV Adoption Over Years">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={byYear}>
                            <XAxis dataKey="year" interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Line dataKey="count" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard title="EV Type Distribution">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={coloredTypeData} dataKey="value" label />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard title="Top 10 Brands">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={byMake}>
                            <XAxis dataKey="make" interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Top Counties">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={byCounty}>
                            <XAxis dataKey="county" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <DataTable rows={data.slice(0, 60)} />
        </div>
    );
}