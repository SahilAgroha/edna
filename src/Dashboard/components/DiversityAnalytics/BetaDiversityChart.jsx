import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DashboardCard from '../TaxaExplorer/DashboardCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BetaDiversityChart = ({ betaData }) => {
  if (!betaData || Object.keys(betaData).length === 0) {
    return (
      <DashboardCard className="h-96 flex items-center justify-center">
        <p className="text-gray-400">No Beta Diversity data available.</p>
      </DashboardCard>
    );
  }

  const labels = Object.keys(betaData);
  const jaccardSimilarities = labels.map(key => betaData[key].jaccard_similarity);
  const jaccardDistances = labels.map(key => betaData[key].jaccard_distance);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Jaccard Similarity',
        data: jaccardSimilarities,
        backgroundColor: '#c084fc', // Purple
        borderColor: '#c084fc',
        borderWidth: 1,
      },
      {
        label: 'Jaccard Distance',
        data: jaccardDistances,
        backgroundColor: '#22d3ee', // Cyan
        borderColor: '#22d3ee',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1500, easing: 'easeInOutQuad' },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'white', font: { size: 10 } },
        title: { display: true, text: 'Sample Pairings', color: 'white' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'white', beginAtZero: true, min: 0, max: 1, stepSize: 0.2 },
        title: { display: true, text: 'Value', color: 'white' },
      },
    },
    plugins: {
      legend: { labels: { color: 'white', font: { size: 14 } } },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        cornerRadius: 6,
      },
      title: { display: true, text: 'Beta Diversity Comparisons', color: 'white', font: { size: 16 } },
    },
  };

  return (
    <DashboardCard className="h-96">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Beta Diversity Comparisons</h3>
      <div style={{ height: 'calc(100% - 3rem)' }}>
        <Bar data={data} options={options} />
      </div>
    </DashboardCard>
  );
};

export default BetaDiversityChart;