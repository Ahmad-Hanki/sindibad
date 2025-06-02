"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the type for the chart data
interface ChartData {
  month: string;
  totalOrders: number;
}

// Define the type for the component props
interface ChartProps {
  data: ChartData[]; // Dynamic chart data passed as a prop
}

const chartConfig = {
  totalOrders: {
    label: "Total Orders",
    color: "blue",
  },
} satisfies ChartConfig;

export default function LineChartComponent({ data }: ChartProps) {
  return (
    <div className="flex-1 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Toplam Siparişler</CardTitle>
          <CardDescription>2025 - 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="totalOrders"
                type="natural"
                stroke="var(--color-totalOrders)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Son 12 ayın toplam siparişleri gösteriliyor{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
