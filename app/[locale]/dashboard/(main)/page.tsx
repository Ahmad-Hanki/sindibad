import React from "react";
import { preloadChartData } from "./_utils/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";
import DashboardClient from "./dashboard-client";

const DashboardPage = async () => {
  const { dehydratedState } = await preloadChartData();
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardClient />
    </HydrationBoundary>
  );
};

export default DashboardPage;
