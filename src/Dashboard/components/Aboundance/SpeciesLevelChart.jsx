import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import DashboardCard from '../TaxaExplorer/DashboardCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SpeciesLevelChart = ({ title, levelData }) => {
    if (!levelData || Object.keys(levelData).length === 0) {
        return (
            <DashboardCard className="h-96 flex items-center justify-center">
                <p className="text-gray-400">No data available for this level.</p>
            </DashboardCard>
        );
    }

    const sampleIds = Object.keys(levelData);
    const allSpecies = [...new Set(sampleIds.flatMap(sampleId => Object.keys(levelData[sampleId])))];
    
    // Generate a vibrant color palette for the chart
    const genColors = [
        '#f87171', '#fbbf24', '#a855f7', '#60a5fa', '#34d399'
    ];

    const datasets = allSpecies.map((species, index) => ({
        label: species,
        data: sampleIds.map(sampleId => levelData[sampleId]?.[species] || 0),
        backgroundColor: genColors[index % genColors.length],
        borderColor: genColors[index % genColors.length],
        borderWidth: 1,
        // Add subtle shadow for depth
        shadowColor: genColors[index % genColors.length] + '80', // Add opacity to the color
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
    }));

    const data = {
        labels: sampleIds,
        datasets: datasets,
    };

    const options = {
        indexAxis: 'y', // This makes it a horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        animation: { 
            duration: 1500, 
            easing: 'easeInOutQuart',
            x: { from: 0 } // Animate bars from the left
        },
        scales: {
            x: { 
                stacked: true,
                grid: { color: 'rgba(255,255,255,0.1)' }, 
                ticks: { color: 'white', beginAtZero: true } 
            },
            y: { 
                stacked: true,
                grid: { color: 'rgba(255,255,255,0.1)' }, 
                ticks: { color: 'white' } 
            },
        },
        plugins: {
            legend: { 
                position: 'right', 
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
            <div style={{ height: '100%' }}>
                <Bar data={data} options={options} />
            </div>
        </DashboardCard>
    );
};

export default SpeciesLevelChart;