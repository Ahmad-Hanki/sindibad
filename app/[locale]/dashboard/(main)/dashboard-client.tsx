"use client";

import { useChartData } from "./_api/get-chart-data";
import Chart from "./_components/Chart";
import LineChartComponent from "./_components/LineChart";

const DashboardClient = () => {
  const { data } = useChartData({});

  return (
    <div className="py-20 px-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
        <Chart data={data ?? []} />
        <LineChartComponent data={data ?? []} />
      </div>
    </div>
  );
};

export default DashboardClient;
