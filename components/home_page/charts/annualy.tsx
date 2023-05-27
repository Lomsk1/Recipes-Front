"use client";

import { useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Provider } from "react-redux";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "ყოველწლიური ოდენობა",
    },
  },
};

function AnnuallyRecipeChart() {
  const {
    annuallyStats,
    annuallyIsLoading,
  }: {
    annuallyStats: {
      status: string;
      stats: { numRecipes: number; numRatings: number; month: string }[];
    };
    annuallyIsLoading: boolean;
  } = useAppSelector((state) => state.recipeAPI);

  const data = {
    labels: !annuallyIsLoading
      ? annuallyStats.stats.map((data) => data.month)
      : [],
    datasets: [
      {
        label: "რეცეპტის რაოდენობა",
        data: !annuallyIsLoading
          ? annuallyStats.stats.map((data) => data.numRecipes)
          : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "რეიტინგის რაოდენობა",
        data: !annuallyIsLoading
          ? annuallyStats.stats.map((data) => data.numRatings)
          : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Provider store={store}>
        <Line options={options} data={data} />
      </Provider>
    </>
  );
}

export default AnnuallyRecipeChart;

// "იან",
//       "თებ",
//       "მარ",
//       "აპრ",
//       "მაი",
//       "ივნ",
//       "ივლ",
//       "აგვ",
//       "სექ",
//       "ოქტ",
//       "ნოე",
//       "დეკ",

// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("January")
//   ? annuallyStats.stats.filter((data) => data.month === "January")[0]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("February")
//   ? annuallyStats.stats.filter((data) => data.month === "February")[1]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("March")
//   ? annuallyStats.stats.filter((data) => data.month === "March")[2]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("April")
//   ? annuallyStats.stats.filter((data) => data.month === "April")[3]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("May")
//   ? annuallyStats.stats.filter((data) => data.month === "May")[4]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("June")
//   ? annuallyStats.stats.filter((data) => data.month === "June")[5]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("July")
//   ? annuallyStats.stats.filter((data) => data.month === "July")[6]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("August")
//   ? annuallyStats.stats.filter((data) => data.month === "August")[7]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("September")
//   ? annuallyStats.stats.filter(
//       (data) => data.month === "September"
//     )[8].month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("October")
//   ? annuallyStats.stats.filter((data) => data.month === "October")[9]
//       .month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("November")
//   ? annuallyStats.stats.filter(
//       (data) => data.month === "November"
//     )[10].month
//   : "",
// !annuallyIsLoading &&
// annuallyStats.stats.map((data) => data.month).includes("December")
//   ? annuallyStats.stats.filter(
//       (data) => data.month === "December"
//     )[11].month
//   : "",
