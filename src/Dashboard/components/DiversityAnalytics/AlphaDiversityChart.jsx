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

const AlphaDiversityChart = ({ alphaData }) => {
  if (!alphaData) return null;

  const labels = ['Sample_Forest_E', 'Sample_Pond_A', 'Sample_Lake_B', 'Sample_River_C', 'Sample_Marine_D'];
  const customTicks = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 6, 8, 10, 12, 14, 16, 17, 18, 20];
  const chartRef = React.useRef(null);
  
  const colors = {
    'species_richness': '#4ade80', // Green
    'shannon_diversity': '#22d3ee', // Cyan
    'simpson_diversity': '#c084fc', // Purple
    'evenness': '#f87171', // Red
  };

  const createGradient = (ctx, chartArea, color) => {
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`;
    gradient.addColorStop(0, `${rgba}, 0)`);
    gradient.addColorStop(0.5, `${rgba}, 0.2)`);
    gradient.addColorStop(1, `${rgba}, 0.5)`);
    return gradient;
  };

  const datasets = [
    {
      label: 'Species Richness',
      data: labels.map(sampleId => alphaData.species_richness?.[sampleId] || 0),
      borderColor: colors.species_richness,
      backgroundColor: (context) => createGradient(context.chart.ctx, context.chart.chartArea, colors.species_richness),
      fill: true,
      tension: 0.4,
      yAxisID: 'y_species',
      pointRadius: 7,
      pointHoverRadius: 10,
      pointBackgroundColor: colors.species_richness,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
      pointHitRadius: 15,
      shadowColor: 'rgba(74, 222, 128, 0.5)',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    {
      label: 'Shannon Diversity',
      data: labels.map(sampleId => alphaData.shannon_diversity?.[sampleId] || 0),
      borderColor: colors.shannon_diversity,
      backgroundColor: `rgba(34, 211, 238, 0.2)`,
      fill: false,
      tension: 0.4,
      yAxisID: 'y_other',
      pointRadius: 7,
      pointHoverRadius: 10,
      pointBackgroundColor: colors.shannon_diversity,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
      pointHitRadius: 15,
      shadowColor: 'rgba(34, 211, 238, 0.5)',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    {
      label: 'Simpson Diversity',
      data: labels.map(sampleId => alphaData.simpson_diversity?.[sampleId] || 0),
      borderColor: colors.simpson_diversity,
      backgroundColor: `rgba(192, 132, 252, 0.2)`,
      fill: false,
      tension: 0.4,
      yAxisID: 'y_other',
      pointRadius: 7,
      pointHoverRadius: 10,
      pointBackgroundColor: colors.simpson_diversity,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
      pointHitRadius: 15,
      shadowColor: 'rgba(192, 132, 252, 0.5)',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    {
      label: 'Evenness',
      data: labels.map(sampleId => alphaData.evenness?.[sampleId] || 0),
      borderColor: colors.evenness,
      backgroundColor: `rgba(248, 113, 113, 0.2)`,
      fill: false,
      tension: 0.4,
      yAxisID: 'y_other',
      pointRadius: 7,
      pointHoverRadius: 10,
      pointBackgroundColor: colors.evenness,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
      pointHitRadius: 15,
      shadowColor: 'rgba(248, 113, 113, 0.5)',
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
  ];

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1800,
      easing: 'easeInOutQuart',
      onProgress: (animation) => {
        if (animation.chart.scales.x && animation.chart.scales.x.grid) {
          const ctx = animation.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, animation.chart.width, 0);
          gradient.addColorStop(0, 'rgba(255,255,255,0.05)');
          gradient.addColorStop(animation.currentStep / animation.numSteps, 'rgba(255,255,255,0.2)');
          gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
          animation.chart.scales.x.grid.color = gradient;
        }
      },
      onComplete: (animation) => {
        if (animation.chart.scales.x && animation.chart.scales.x.grid) {
          animation.chart.scales.x.grid.color = 'rgba(255,255,255,0.1)';
        }
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      animationDuration: 300,
      onHover: (event, elements, chart) => {
        if (elements.length) {
          const datasetIndex = elements[0].datasetIndex;
          chart.data.datasets.forEach((dataset, i) => {
            if (i === datasetIndex) {
              dataset.borderWidth = 4;
              dataset.shadowBlur = 20;
            } else {
              dataset.borderWidth = 2;
              dataset.shadowBlur = 0;
            }
          });
          chart.update('none');
        } else {
          chart.data.datasets.forEach((dataset) => {
            dataset.borderWidth = 2;
            dataset.shadowBlur = 0;
          });
          chart.update('none');
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: 'white', font: { size: 12 } },
        title: {
          display: true,
          text: 'Sample ID',
          color: 'white',
          font: { size: 14 }
        }
      },
      y_species: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: 'rgba(255,255,255,0.1)' },
        title: {
          display: true,
          text: 'Species Richness',
          color: colors.species_richness,
          font: { size: 14 }
        },
        ticks: {
          color: 'white',
          callback: (value) => customTicks.includes(value) ? value : null,
          font: { size: 12 }
        },
        beginAtZero: true,
      },
      y_other: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'Diversity Metrics',
          color: 'white',
          font: { size: 14 }
        },
        ticks: {
          color: 'white',
          beginAtZero: true,
          min: 0,
          max: 4,
          stepSize: 0.5,
          font: { size: 12 }
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: { size: 14 },
          boxWidth: 20,
          boxHeight: 10,
          padding: 20,
        },
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: 'rgba(40, 50, 70, 0.95)',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        caretSize: 10,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        boxPadding: 5,
        callbacks: {
          title: (context) => `Sample: ${context[0].label}`,
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return ` ${label}: ${value.toFixed(3)}`;
          },
          labelColor: function(context) {
            const color = context.dataset.borderColor;
            return {
              borderColor: color,
              backgroundColor: color,
              borderWidth: 2,
              borderRadius: 2,
            };
          }
        },
      },
      title: {
        display: true,
        text: 'Alpha Diversity Metrics Across Samples',
        color: 'white',
        font: {
          size: 24,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: {
          top: 10,
          bottom: 25
        }
      },
    },
  };

  return (
    <DashboardCard className="h-full relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 animate-pulse-light" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, rgba(17, 24, 39, 0) 70%)'
      }}></div>
      <div className="absolute top-0 left-0 w-full h-1/2 z-0 opacity-5" style={{
        background: 'linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 0%, transparent 100%)'
      }}></div>
      <h3 className="text-xl font-bold text-gray-200 mb-4 z-10 relative">Alpha Diversity Metrics</h3>
      <div style={{ height: '600px' }} className="z-10 relative">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </DashboardCard>
  );
};

export default AlphaDiversityChart;