import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import getChartOrderData from "@/server-actions/get/get-chart-data-action";

export const getChartData = async () => {
  return await getChartOrderData();
};

export const getChartDataQueryOptions = () => {
  return queryOptions({
    queryKey: ["ChartData"],
    queryFn: () => getChartData(),
  });
};

type UseChartDataOptions = {
  queryConfig?: QueryConfig<typeof getChartDataQueryOptions>;
};

export const useChartData = ({ queryConfig }: UseChartDataOptions) => {
  return useQuery({
    ...getChartDataQueryOptions(),
    ...queryConfig,
  });
};
