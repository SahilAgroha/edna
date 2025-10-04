import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DashboardCard from '../TaxaExplorer/DashboardCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const KingdomLevelChart = ({ title, levelData }) => {
    if (!levelData || Object.keys(levelData).length === 0) {
        return (
            <DashboardCard className="h-96 flex items-center justify-center">
                <p className="text-gray-400">No data available for this level.</p>
            </DashboardCard>
        );
    }

    const sampleIds = Object.keys(levelData);
    const kingdoms = ['Eukaryota', 'Archaea', 'Bacteria'];

    const colors = {
        'Eukaryota': 'rgba(74, 222, 128, 0.8)',  // Green
        'Archaea': 'rgba(251, 191, 36, 0.8)',    // Yellow
        'Bacteria': 'rgba(34, 211, 238, 0.8)',   // Cyan
    };

    const datasets = kingdoms.map(kingdom => ({
        label: kingdom,
        data: sampleIds.map(sampleId => levelData[sampleId]?.[kingdom] || 0),
        backgroundColor: colors[kingdom],
        borderColor: colors[kingdom].replace('0.8)', '1)'),
        borderWidth: 1,
        // Add subtle shadow for depth
        shadowColor: colors[kingdom].replace('0.8)', '0.5)'),
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
    }));

    const data = {
        labels: sampleIds,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
            // Animate bars growing from the bottom
            y: {
                from: 0
            }
        },
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
            legend: { 
                position: 'top', 
                labels: { color: 'white', font: { size: 12 } } 
            },
            tooltip: {
                titleColor: 'white', bodyColor: 'white', backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: 'rgba(255,255,255,0.3)', borderWidth: 1, cornerRadius: 6,
            },
            title: { 
                display: true, 
                text: title, 
                color: 'white', 
                font: { size: 16, weight: 'bold' } 
            },
        },
    };

    return (
        <DashboardCard className="h-96">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Kingdom Abundance Comparison</h3>
            <div style={{ height: 'calc(100% - 3rem)' }}>
                <Bar data={data} options={options} />
            </div>
        </DashboardCard>
    );
};

export default KingdomLevelChart;