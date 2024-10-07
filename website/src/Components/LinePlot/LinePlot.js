import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components needed for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: [70, 80, 90, 100, 110],
    datasets: [
      {
        label: '04/10/2023',
        data: [0.91, 0.88, 0.73, null, null],
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1,
      },

      {
        label: '30/09/2024',
        data: [1, 0.93, 0.79, 0.72, 0.6],
        fill: false,
        borderColor: 'rgb(0, 0, 255)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart Example',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weight',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Max Speed',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;