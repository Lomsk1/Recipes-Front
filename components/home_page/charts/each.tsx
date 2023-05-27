"use client";

import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  PointElement,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  PointElement,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
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
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "რეცეპტების ოდენობა",
    },
  },
};

function EachRecipeChart({ stats }: StatsDataTypes) {
  const data = {
    labels: ["მარტივი", "საშუალო", "რთული"],
    datasets: [
      {
        label: "რაოდენობა",
        data: [
          stats.map((data) => data._id).includes("მარტივი")
            ? stats.filter((data) => data._id === "მარტივი")[0].numRecipes
            : 0,
          stats.map((data) => data._id).includes("საშუალო")
            ? stats.filter((data) => data._id === "საშუალო")[0].numRecipes
            : 0,
          stats.map((data) => data._id).includes("რთული")
            ? stats.filter((data) => data._id === "რთული")[0].numRecipes
            : 0,
        ],
        fill: false,
        backgroundColor: [
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 99, 132, 0.4)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
      {
        label: "რეიტინგის რაოდენობა",
        data: [
          stats.map((data) => data._id).includes("მარტივი")
            ? stats.filter((data) => data._id === "მარტივი")[0].numRatings
            : 0,
          stats.map((data) => data._id).includes("საშუალო")
            ? stats.filter((data) => data._id === "საშუალო")[0].numRatings
            : 0,
          stats.map((data) => data._id).includes("რთული")
            ? stats.filter((data) => data._id === "რთული")[0].numRatings
            : 0,
        ],
        fill: false,
        backgroundColor: [
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 99, 132, 0.4)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  return (
    <>
      <div className="chart_bar">
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default EachRecipeChart;
