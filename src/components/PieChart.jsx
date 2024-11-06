import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "",
        data: [pendingTasks, completedTasks],
        backgroundColor: ["#142e15", "#3f9142"], 
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 12, 
          },
        },
      },
      tooltip: {
        enabled: true, 
      },
    },
    cutout: "50%", 
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
