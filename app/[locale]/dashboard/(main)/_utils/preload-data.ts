import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getChartDataQueryOptions } from "../_api/get-chart-data";

export const preloadChartData = async () => {
  const queryClient = new QueryClient();
  const staticPrefetches = [
    queryClient.prefetchQuery(getChartDataQueryOptions()),
  ];

  await Promise.all([...staticPrefetches]);
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  return {
    dehydratedState,
  };
};
