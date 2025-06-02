"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

// Define the type for the chart data
interface ChartData {
  month: string;
  totalPayment: number;
}

// Define the type for the component props
interface ChartProps {
  data: ChartData[]; // Dynamic chart data passed as a prop
}

const chartConfig = {
  totalPayment: {
    label: "Total Payment",
    color: "hsl(var(--chart-2))",
  },
};

export default function Chart({ data }: ChartProps) {
  return (
    <div className="flex-1 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Toplam Ödeme</CardTitle>
          <CardDescription>2025 - 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart className="w-full" height={250} data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // Format month abbreviation
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [value, chartConfig.totalPayment.label]} // Tooltip only for totalPayment
              />
              <Legend
                formatter={() => chartConfig.totalPayment.label} // Legend only for totalPayment
              />

              <Bar
                dataKey="totalPayment"
                fill={chartConfig.totalPayment.color}
                radius={[4, 4, 0, 0]}
                barSize={45} // Adjust the width of the bar to fit the container better
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Son 12 aya ait veriler gösteriliyor
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
