"use client";

import { Chart } from "chart.js";
import {
  CategoryScale,
  PointElement,
  ArcElement,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(
  CategoryScale,
  PointElement,
  ArcElement,
  LinearScale,
  Title,
  Tooltip
);

interface StatsDataTypes {
  stats: {
    _id: string;
    numRecipes: number;
    numRatings: number;
    avgRating: number;
  }[];
}

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "რეცეპტების ოდენობა",
    },
  },
};

function AllRecipeChart({ stats }: StatsDataTypes) {
  const data = {
    labels: ["რეცეპტების სრული რაოდენობა"],
    datasets: [
      {
        label: "რაოდენობა",
        data: [
          stats.length > 0
            ? stats
                .map((data) => data.numRecipes)
                .reduce((acc, cur) => acc + cur)
            : 0,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="doughnut">
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default AllRecipeChart;
