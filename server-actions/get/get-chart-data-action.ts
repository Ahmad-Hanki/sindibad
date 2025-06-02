"use server";
import prisma from "@/lib/db";

// Define the type for the aggregated data
export interface ChartDataType {
  [month: string]: {
    totalPayment: number; // Replaced 'totalAmount' with 'totalPayment'
    totalOrders: number; // Replaced 'orderCount' with 'totalOrders'
  };
}

async function getChartOrderData() {
  const chartOrder = await prisma.order.findMany({
    // where: {
    //   status: "DELIVERED",
    // },
    select: {
      total: true,
      createdAt: true,
    },
  });

  // Helper function to format date into "yyyy-MM"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for the month
    return `${year}-${month}`;
  };

  // Aggregate orders by month
  const monthlyData: ChartDataType = chartOrder.reduce((acc, order) => {
    const month = formatDate(order.createdAt); // Format the date to year-month
    if (!acc[month]) {
      acc[month] = { totalPayment: 0, totalOrders: 0 }; // Initialize with totalPayment and totalOrders
    }
    acc[month].totalPayment += order.total;
    acc[month].totalOrders += 1;
    return acc;
  }, {} as ChartDataType); // Type assertion here

  // Convert the aggregated data into an array of 12 months
  const months = Array.from({ length: 12 }, (_, index) => {
    const month = new Date();
    month.setMonth(month.getMonth() - index); // Set the month for the last 12 months
    const monthKey = formatDate(month);

    return {
      month: month.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }), // Localize month name
      totalPayment: monthlyData[monthKey]?.totalPayment || 0, // Replace with totalPayment
      totalOrders: monthlyData[monthKey]?.totalOrders || 0, // Replace with totalOrders
    };
  }).reverse(); // Reverse to start from the oldest month

  return months;
}

export default getChartOrderData;
