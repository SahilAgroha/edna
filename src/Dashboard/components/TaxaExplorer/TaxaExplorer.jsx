import React, { useEffect, useState } from 'react';
// 1. IMPORT LOCAL JSON DATA DIRECTLY
import localData from '../../../data/edna_prediction_data.json';

// Removed Redux imports: useSelector, useDispatch, fetchOverviewsAsync, fetchAnalysisAsync

import { Select, MenuItem, FormControl, InputLabel, CircularProgress, Box, Typography, Button } from '@mui/material';
import { BugReport, Cloud, Forest, Water } from '@mui/icons-material';
import DashboardCard from './DashboardCard';
import DashboardMessageCard from './DashboardMessageCard';

// Helper function to map sample ID to a representative icon
const getSampleIcon = (sampleId) => {
  if (sampleId.includes('Pond')) return <Water sx={{ color: 'info.main' }} />;
  if (sampleId.includes('Lake')) return <Cloud sx={{ color: 'cyan.300' }} />;
  if (sampleId.includes('River')) return <Water sx={{ color: 'secondary.main' }} />;
  if (sampleId.includes('Marine')) return <Water sx={{ color: 'primary.main' }} />;
  if (sampleId.includes('Forest')) return <Forest sx={{ color: 'success.main' }} />;
  return <BugReport sx={{ color: 'grey.400' }} />;
};

// Array of vibrant color themes for the cards
const colorThemes = [
  { mainBg: 'bg-indigo-900/40', text: 'text-indigo-200', accent: 'text-indigo-400', shadow: 'shadow-indigo-500/10', hoverBorder: 'hover:border-indigo-500' },
  { mainBg: 'bg-teal-900/40', text: 'text-teal-200', accent: 'text-teal-400', shadow: 'shadow-teal-500/10', hoverBorder: 'hover:border-teal-500' },
  { mainBg: 'bg-purple-900/40', text: 'text-purple-200', accent: 'text-purple-400', shadow: 'shadow-purple-500/10', hoverBorder: 'hover:border-purple-500' },
  { mainBg: 'bg-blue-900/40', text: 'text-blue-200', accent: 'text-blue-400', shadow: 'shadow-blue-500/10', hoverBorder: 'hover:border-blue-500' },
];

// Array of colors for the dropdown list items
const menuItemColors = [
    '#22d3ee', '#4ade80', '#c084fc', '#f87171', '#fbbf24'
];

// Define a static analysis structure and default ID
const STATIC_ANALYSIS_ID = '1';
const STATIC_ANALYSIS_TITLE = 'Local Metagenomic Data';

const STATIC_OVERVIEWS = [
    { id: STATIC_ANALYSIS_ID, title: STATIC_ANALYSIS_TITLE }
];


const TaxaExplorer = () => {
    // 2. Use local state to manage data and loading status
    const [status, setStatus] = useState('loading');
    const [selectedAnalysisId, setSelectedAnalysisId] = useState('');
    const [currentAnalysis, setCurrentAnalysis] = useState(null); // Holds the entire JSON data
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 3. useEffect to load the static data on component mount
    useEffect(() => {
      try {
          // Directly load the imported JSON data
          setCurrentAnalysis(localData);
          setSelectedAnalysisId(STATIC_ANALYSIS_ID);
          setStatus('succeeded');
      } catch (e) {
        console.error("Error loading local data:", e);
        setStatus('failed');
      }
    }, []); // Run only once

    const handleAnalysisChange = (event) => {
        // Since we only have one analysis, this logic is simple
        const id = event.target.value;
        setSelectedAnalysisId(id);
        setCurrentAnalysis(id === STATIC_ANALYSIS_ID ? localData : null);
        setCurrentPage(1); // Reset pagination on analysis change (even if it's the same)
    };

    const renderTaxonomicPredictions = () => {
        if (!currentAnalysis?.taxonomic_predictions || Object.keys(currentAnalysis.taxonomic_predictions).length === 0) {
            return (
              <DashboardMessageCard 
                title="No taxonomic predictions found for this analysis."
              />
            );
        }

        // Flatten all predictions from all samples into a single array, adding sampleId to each item
        const allPredictions = Object.entries(currentAnalysis.taxonomic_predictions).flatMap(([sampleId, predictions]) => 
            predictions.map(taxa => ({ ...taxa, sampleId }))
        );

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = allPredictions.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(allPredictions.length / itemsPerPage);

        return (
            <Box>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((taxa, index) => {
                  const theme = colorThemes[index % colorThemes.length];
                  return (
                    <div 
                      key={taxa.sequence_id}
                      className={`
                        ${theme.mainBg} border-2 border-white/10 rounded-2xl p-6 shadow-2xl
                        transition-all duration-300 transform 
                        ${theme.hoverBorder} hover:scale-105 hover:${theme.shadow}
                        relative group
                      `}
                    >
                      <Box className="flex items-center justify-between mb-4">
                        <Box className="flex items-center gap-2">
                            {/* NOTE: `taxa.sampleId` is added during the flatMap step */}
                          {getSampleIcon(taxa.sampleId)}
                          <Typography variant="subtitle1" className={`${theme.accent} font-bold`}>{taxa.sampleId}</Typography>
                        </Box>
                        <Typography variant="body2" className={`font-semibold ${taxa.novel_candidate === 'Yes' ? 'text-yellow-400' : 'text-green-400'}`}>
                          {taxa.novel_candidate === 'Yes' ? 'Novel' : 'Known'}
                        </Typography>
                      </Box>

                      <Typography variant="h6" className={`${theme.text} font-bold mb-1`}>{taxa.species}</Typography>
                      <Typography variant="body2" className="text-gray-400 mb-4">{taxa.genus}</Typography>
                      
                      <Box className="grid grid-cols-2 gap-4 text-sm">
                        <Box>
                          <Typography variant="caption" className="text-gray-500 block">Kingdom</Typography>
                          <Typography variant="body2" className={`${theme.accent}`}>{taxa.kingdom}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" className="text-gray-500 block">Phylum</Typography>
                          <Typography variant="body2" className={`${theme.accent}`}>{taxa.phylum}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" className="text-gray-500 block">Sequence Count</Typography>
                          <Typography variant="body2" className={`${theme.text}`}>{taxa.sequence_count}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" className="text-gray-500 block">Overall Confidence</Typography>
                          <Typography variant="body2" className={`${theme.text}`}>{taxa.overall_confidence?.toFixed(3)}</Typography>
                        </Box>
                      </Box>
                    </div>
                  );
                })}
              </div>
        
              {/* Pagination Controls */}
              {allPredictions.length > itemsPerPage && (
                <Box className="flex justify-center items-center mt-8">
                  <Button
                    variant="outlined"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    sx={{
                      color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                  >
                    Previous
                  </Button>
                  <Typography variant="body1" sx={{ mx: 2, color: 'grey.300' }}>
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    sx={{
                      color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Box>
        );
    };

    // 4. Modified Status Checks
    if (status === 'loading') {
      return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'transparent', color: 'grey.200' }}>
          <CircularProgress color="primary" />
          <Typography variant="h5" sx={{ ml: 2 }}>Loading local taxonomic data...</Typography>
      </Box>
      );
    }

    if (status === 'failed' || !currentAnalysis) {
      return (
        <DashboardMessageCard 
          title="Error or missing data."
          message="The local JSON data file for taxonomic predictions could not be loaded."
        />
      );
    }

    return (
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', mb: 6, gap: { xs: 2, md: 0 } }}>
          <div>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }} className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Taxa Explorer
            </Typography>
            <Typography className="text-gray-400 text-sm mt-1">Explore all identified taxa for a selected analysis</Typography>
          </div>
        
          {/* 5. Static Selection Component */}
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
                    '&:hover': {
                        bgcolor: 'rgba(0, 188, 212, 0.2) !important',
                        color: 'cyan.300',
                        fontWeight: 'bold',
                    },
                    '&.Mui-focused': {
                        bgcolor: 'rgba(255, 255, 255, 0.05) !important',
                    },
                    '&::before, &::after': {
                        display: 'none',
                    },
                },
              '& .MuiInputLabel-filled': {
                    color: 'grey.400',
                    '&.Mui-focused': {
                        color: 'cyan.300',
                    },
                },
              '& .MuiSelect-select': {
                    color: 'white',
                    paddingRight: '32px !important',
                },
              '& .MuiSvgIcon-root': {
                    color: 'white',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                },
              '& .MuiMenu-paper': {
                    bgcolor: 'rgba(30, 41, 59, 0.9) !important',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                },
              '& .MuiMenuItem-root': {
                    color: 'grey.300',
                    '&:hover': {
                        bgcolor: 'rgba(0, 188, 212, 0.1) !important',
                        color: 'cyan.300',
                    },
                    '&.Mui-selected': {
                        bgcolor: 'rgba(0, 188, 212, 0.2) !important',
                        color: 'cyan.300',
                        fontWeight: 'bold',
                    },
                },
            }}
          >
            <InputLabel id="analysis-select-label">Select Analysis</InputLabel>
            <Select
              labelId="analysis-select-label"
              id="analysis-select"
              value={selectedAnalysisId}
              onChange={handleAnalysisChange}
              onOpen={() => setIsDropdownOpen(true)}
              onClose={() => setIsDropdownOpen(false)}
              label="Select Analysis"
              MenuProps={{ PaperProps: { sx: { marginTop: '8px', }, }, TransitionProps: { timeout: 200, }, }}
            >
              <MenuItem value="">
                <em>-- Select an Analysis --</em>
              </MenuItem>
              {/* Render static option */}
              {STATIC_OVERVIEWS.map((overview, index) => {
                  const color = menuItemColors[index % menuItemColors.length];
                  return (
                	<MenuItem 
                      key={overview.id} 
                      value={overview.id}
                      sx={{ 
                        color: color, 
                        '&.Mui-selected': { 
                          bgcolor: `${color}40 !important`,
                          color: color, 
                          fontWeight: 'bold' 
                      }
                    }}
                	>
                      Analysis ID: {overview.id} - {overview.title}
                  </MenuItem>
                );
            })}
            </Select>
          </FormControl>
          </DashboardCard>
        </Box>

      {selectedAnalysisId && currentAnalysis ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'grey.200' }}>
            Taxonomic Predictions for Analysis ID: <Box component="span" sx={{ color: 'info.main' }}>{selectedAnalysisId}</Box>
          </Typography>
          {renderTaxonomicPredictions()}
      </Box>
      ) : (
        <DashboardMessageCard 
          title="Please select an analysis from the dropdown to explore taxa."
        />
      )}
    </Box>
  );
};

export default TaxaExplorer;