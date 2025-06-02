"use client";

import { useChartData } from "./_api/get-chart-data";
import Chart from "./_components/Chart";
import LineChartComponent from "./_components/LineChart";

const DashboardClient = () => {
  const { data } = useChartData({});

  return (
    <div className="py-20 px-10">
      <div className="flex items-center justify-center gap-3">
        <Chart data={data ?? []} />
        <LineChartComponent data={data ?? []} />
      </div>
    </div>
  );
};

export default DashboardClient;
