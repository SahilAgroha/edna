import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import DashboardCard from '../TaxaExplorer/DashboardCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PhylumLevelChart = ({ title, levelData }) => {
    if (!levelData || Object.keys(levelData).length === 0) {
        return (
            <DashboardCard className="h-96 flex items-center justify-center">
                <p className="text-gray-400">No data available for this level.</p>
            </DashboardCard>
        );
    }

    const sampleIds = Object.keys(levelData);
    const allPhyla = [...new Set(sampleIds.flatMap(sampleId => Object.keys(levelData[sampleId])))];
    
    const genColors = [
        '#22d3ee', // Cyan
        '#4ade80', // Green
        '#c084fc', // Purple
        '#f87171', // Red
        '#fbbf24', // Yellow
        '#60a5fa', // Blue
        '#a855f7', // Violet
        '#e879f9', // Pink
        '#f9a8d4', // Light Pink
    ];

    const datasets = allPhyla.map((phylum, index) => ({
        label: phylum,
        data: sampleIds.map(sampleId => levelData[sampleId]?.[phylum] || 0),
        borderColor: genColors[index % genColors.length],
        backgroundColor: genColors[index % genColors.length] + '40',
        fill: false,
        tension: 0.4, // This creates the spline (curved) effect
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: genColors[index % genColors.length],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
    }));

    const data = {
        labels: sampleIds,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeInOutQuart' },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: 'white' },
                title: { display: true, text: 'Sample ID', color: 'white' }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: 'white', beginAtZero: true },
                title: { display: true, text: 'Sequence Count', color: 'white' }
            },
        },
        plugins: {
            legend: { position: 'top', labels: { color: 'white', font: { size: 12 } } },
            tooltip: {
                titleColor: 'white', bodyColor: 'white', backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: 'rgba(255,255,255,0.3)', borderWidth: 1, cornerRadius: 6,
            },
            title: { display: true, text: title, color: 'white', font: { size: 16, weight: 'bold' } },
        },
    };

    return (
        <DashboardCard className="h-96">
            <div style={{ height: '100%' }}>
                <Line data={data} options={options} />
            </div>
        </DashboardCard>
    );
};

export default PhylumLevelChart;