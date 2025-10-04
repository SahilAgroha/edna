import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// Import the local JSON file directly
import localData from '../../../data/edna_prediction_data.json'; 

// Import chart components (assuming relative path is correct)
import KingdomLevelChart from './KingdomLevelChart';
import PhylumLevelChart from './PhylumLevelChart';
import GenusLevelChart from './GenusLevelChart';
import SpeciesLevelChart from './SpeciesLevelChart';
import SampleCardsGrid from './SampleCardsGrid';
import SampleDetailModal from './SampleDetailModal';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import DashboardMessageCard from '../TaxaExplorer/DashboardMessageCard';

// Define a static analysis structure based on the imported JSON
const STATIC_ANALYSES = [
    { id: '1', title: 'Default Metagenomic Analysis', data: localData },
];
const DEFAULT_ANALYSIS_ID = STATIC_ANALYSES[0].id;

const Abundance = () => {
    // We mock the Redux state logic with local state
    const [status, setStatus] = useState('loading');
    const [selectedAnalysisId, setSelectedAnalysisId] = useState('');
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSampleId, setModalSampleId] = useState(null);

    // Effect to load the static data on mount
    useEffect(() => {
        try {
            // Find the data for the default analysis
            const defaultAnalysis = STATIC_ANALYSES.find(a => a.id === DEFAULT_ANALYSIS_ID);

            if (defaultAnalysis) {
                // Simulate successful loading
                setCurrentAnalysis(defaultAnalysis.data);
                setSelectedAnalysisId(defaultAnalysis.id);
                setStatus('succeeded');
            } else {
                setStatus('failed');
            }
        } catch (e) {
            console.error("Error loading local data:", e);
            setStatus('failed');
        }
    }, []); // Empty dependency array ensures this runs once on mount

    const handleAnalysisChange = (event) => {
        const id = event.target.value;
        setSelectedAnalysisId(id);
        const analysis = STATIC_ANALYSES.find(a => a.id === id);
        setCurrentAnalysis(analysis ? analysis.data : null);
    };

    const handleSampleClick = (sampleId) => {
        setModalSampleId(sampleId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalSampleId(null);
    };

    const renderAbundanceCharts = () => {
        if (!currentAnalysis?.abundance_data) {
            return (
                <DashboardMessageCard 
                    title="No abundance data available for this analysis."
                />
            );
        }

        const abundanceData = currentAnalysis.abundance_data;
        
        return (
            <div className="mt-8">
                {/* Abundance Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <KingdomLevelChart 
                        title="Kingdom Abundance" 
                        levelData={abundanceData.kingdom_level} 
                    />
                    <PhylumLevelChart 
                        title="Phylum Abundance" 
                        levelData={abundanceData.phylum_level} 
                    />
                    <GenusLevelChart 
                        title="Genus Abundance" 
                        levelData={abundanceData.genus_level} 
                    />
                    <SpeciesLevelChart 
                        title="Species Abundance" 
                        levelData={abundanceData.species_level} 
                    />
                </div>
                
                {/* Sample Summary Grid */}
                <SampleCardsGrid 
                    sampleSummaryData={currentAnalysis.diversity_data.sample_summary} // NOTE: Switched to diversity_data.sample_summary as it contains necessary fields like dominant_kingdom
                    onSampleClick={handleSampleClick}
                />

                {/* The Modal Component */}
                <SampleDetailModal 
                    isOpen={isModalOpen} 
                    onClose={handleModalClose} 
                    sampleId={modalSampleId}
                    sampleData={currentAnalysis.abundance_data}
                />
            </div>
        );
    };

    if (status === 'loading') {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'transparent', color: 'grey.200' }}>
                <CircularProgress color="primary" />
                <Typography variant="h5" sx={{ ml: 2 }}>Loading local data...</Typography>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <DashboardMessageCard 
                title="Error loading static data."
                message="The local data file could not be processed or is missing."
            />
        );
    }

    return (
        <Box sx={{ p: 4, minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', mb: 6, gap: { xs: 2, md: 0 } }}>
                
                <div>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }} className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        Abundance Analytics
                    </Typography>
                    <Typography className="text-gray-400 text-sm mt-1">Analyze taxonomic abundance across samples</Typography>
                </div>
                
                {/* Modified Dropdown to show static data */}
                <DashboardCard 
                    className={`mb-1 p-1 md:p-1 lg:p-1 flex items-center justify-between
                        transition-all duration-300 ease-in-out
                        ${isDropdownOpen ? 'running-border' : 'running-border'}
                    `}
                >
                    <FormControl 
                        variant="filled" 
                        sx={{ 
                            minWidth: 240, 
                            width: 350,
                            bgcolor: 'transparent', 
                            borderRadius: 1,
                            '& .MuiFilledInput-root': {
                                bgcolor: 'transparent !important',
                                // ... other styles
                            },
                            // ... other styles
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() => setIsDropdownOpen(false)}
                    >
                        <InputLabel id="analysis-select-label">Select Analysis</InputLabel>
                        <Select 
                            value={selectedAnalysisId} 
                            onChange={handleAnalysisChange} 
                            label="Select Analysis" 
                            MenuProps={{ PaperProps: { sx: { marginTop: '8px' } }, TransitionProps: { timeout: 200 } }}
                        >
                            <MenuItem value=""><em>-- Select an Analysis --</em></MenuItem>
                            {STATIC_ANALYSES.map(overview => {
                                const menuItemColors = ['#22d3ee', '#4ade80', '#c084fc', '#f87171', '#fbbf24'];
                                const color = menuItemColors[Math.floor(Math.random() * menuItemColors.length)];
                                return (
                                    <MenuItem key={overview.id} value={overview.id} sx={{ color: color, '&.Mui-selected': { bgcolor: `${color}40 !important`, color: color, fontWeight: 'bold' } }}>
                                        Analysis ID: {overview.id} - {overview.title}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </DashboardCard>
            </Box>
            
            {selectedAnalysisId && currentAnalysis ? (
                renderAbundanceCharts()
            ) : (
                <DashboardMessageCard 
                    title="Please select an analysis to view abundance data."
                />
            )}
        </Box>
    );
};

// You must change the default export to export Abundance
export default Abundance;