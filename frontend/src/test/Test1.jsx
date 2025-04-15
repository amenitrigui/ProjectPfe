import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [4, 3, 2, 5, 4, 5, 5],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Test1() {
  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Test1;
