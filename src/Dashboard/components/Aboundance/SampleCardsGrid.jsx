import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import { Water, BugReport, Public, Science } from '@mui/icons-material';

const colorThemes = [
    { mainBg: 'bg-indigo-900/40', text: 'text-indigo-200', accent: 'text-indigo-400', shadow: 'shadow-indigo-500/10', hoverBorder: 'hover:border-indigo-500', animation: 'animate-card-pulse-indigo' },
    { mainBg: 'bg-teal-900/40', text: 'text-teal-200', accent: 'text-teal-400', shadow: 'shadow-teal-500/10', hoverBorder: 'hover:border-teal-500', animation: 'animate-card-pulse-teal' },
    { mainBg: 'bg-purple-900/40', text: 'text-purple-200', accent: 'text-purple-400', shadow: 'shadow-purple-500/10', hoverBorder: 'hover:border-purple-500', animation: 'animate-card-pulse-purple' },
    { mainBg: 'bg-blue-900/40', text: 'text-blue-200', accent: 'text-blue-400', shadow: 'shadow-blue-500/10', hoverBorder: 'hover:border-blue-500', animation: 'animate-card-pulse-blue' },
];

const getKingdomIcon = (kingdom) => {
    switch (kingdom) {
        case 'Archaea': return <Public sx={{ color: 'yellow.300' }} />;
        case 'Eukaryota': return <Water sx={{ color: 'cyan.300' }} />;
        case 'Bacteria': return <BugReport sx={{ color: 'info.main' }} />;
        default: return <Science sx={{ color: 'grey.400' }} />;
    }
};

const SampleCardsGrid = ({ sampleSummaryData, onSampleClick }) => {
    if (!sampleSummaryData || Object.keys(sampleSummaryData).length === 0) {
        return (
            <p>No sample summary data available.</p>
        );
    }

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'grey.200' }}>
                Samples in this Analysis
            </Typography>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(sampleSummaryData).map(([sampleId, summary], index) => {
                    const theme = colorThemes[index % colorThemes.length];
                    return (
                        <div
                            key={sampleId}
                            onClick={() => onSampleClick(sampleId)}
                            className={`
                                ${theme.mainBg} border-2 border-white/10 rounded-2xl p-6 shadow-2xl
                                transition-all duration-300 transform cursor-pointer
                                ${theme.hoverBorder} hover:scale-105 hover:${theme.shadow}
                                relative group
                                ${theme.animation}
                            `}
                        >
                            <Box className="flex items-center justify-between mb-4">
                                <Box className="flex items-center gap-2">
                                    {getKingdomIcon(summary.dominant_kingdom)}
                                    <Typography variant="h6" className={`${theme.text} font-bold`}>{sampleId}</Typography>
                                </Box>
                            </Box>
                            <Box className="grid grid-cols-1 gap-4 text-sm">
                                <Box>
                                    <Typography variant="caption" className="text-gray-500 block">Dominant Kingdom</Typography>
                                    <Typography variant="body2" className={`${theme.accent} font-bold`}>{summary.dominant_kingdom}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" className="text-gray-500 block">Total Sequences</Typography>
                                    <Typography variant="body2" className={`${theme.text} font-bold`}>{summary.total_sequences}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" className="text-gray-500 block">Rare Taxa Count</Typography>
                                    <Typography variant="body2" className={`${theme.text} font-bold`}>{summary.rare_taxa_count}</Typography>
                                </Box>
                            </Box>
                        </div>
                    );
                })}
            </div>
        </Box>
    );
};

export default SampleCardsGrid;