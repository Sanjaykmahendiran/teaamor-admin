"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props {
  chartData?: any; // strict typing for chart.js is complex, allow any for now or specific structure
}

const SalesOverview = ({ chartData }: Props) => {
  const data = chartData || {
    labels: ["Jun", "May", "Apr", "Mar", "Feb", "Jan", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [520000, 490000, 160000, 730000, 540000, 230000, 80000],
        backgroundColor: "#D4AF37",
        borderRadius: 6,
        barThickness: 28,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: "#4B5563",
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              return tickValue.toLocaleString();
            }
            return tickValue;
          },
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm h-[300px]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Sales overview</h2>
        <div className="text-gray-400 cursor-pointer text-sm">≡</div>
      </div>
      <div className="h-[220px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default SalesOverview
