import React from 'react';
import { Box, Typography, Modal, IconButton, Fade } from '@mui/material';
import { Close } from '@mui/icons-material';
import ModalAnimatedBackground from './ModalAnimatedBackground'; // Assuming this component exists

// Define a color palette for the modal content
const contentColors = [
    '#22d3ee', // Cyan
    '#4ade80', // Green
    '#c084fc', // Purple
    '#fbbf24', // Yellow
];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    maxHeight: '90vh',
    bgcolor: 'rgba(30, 41, 59, 0.9)', // Dark gray semi-transparent background
    backdropFilter: 'blur(10px)',
    border: '2px solid',
    borderColor: '#22d3ee', // Vibrant cyan border
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    color: 'white',
    position: 'relative', 
    outline: 'none',
};

const SampleDetailModal = ({ isOpen, onClose, sampleId, sampleData }) => {
    if (!sampleData || Object.keys(sampleData).length === 0 || !isOpen) return null;

    const renderDataList = (title, data, index) => {
        const color = contentColors[index % contentColors.length];
        
        return (
            <Box 
                sx={{ 
                    mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${0.1 + index * 0.15}s`,
                    opacity: 0,
                    borderLeft: `3px solid ${color}`,
                }}
            >
                <Typography 
                    variant="h6" 
                    className="font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2"
                    style={{ backgroundImage: `linear-gradient(to right, ${color}, white)` }}
                >
                    {title}
                </Typography>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300">
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                            <strong className="text-gray-400">{key}:</strong> 
                            <span className="font-bold ml-1" style={{ color }}>{value}</span> sequences
                        </li>
                    ))}
                </ul>
            </Box>
        );
    };

    const levels = ['kingdom_level', 'phylum_level', 'genus_level', 'species_level'];

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="sample-details-title"
                aria-describedby="sample-details-description"
                closeAfterTransition
            >
                <Fade in={isOpen}>
                    <Box sx={modalStyle}>
                        <ModalAnimatedBackground />
                        
                        <Box className="relative z-10">
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    position: 'absolute',
                                    right: -24,
                                    top: -24,
                                    color: 'grey.400',
                                    zIndex: 2,
                                    '&:hover': {
                                        color: 'white',
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                    }
                                }}
                            >
                                <Close />
                            </IconButton>
                            <Typography 
                                id="sample-details-title" 
                                variant="h4" 
                                className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent" 
                                sx={{ fontWeight: 'bold', animation: `fadeInUp 0.6s ease-out forwards`, opacity: 0 }}
                            >
                                Abundance Details for <Box component="span" sx={{ color: 'info.main' }}>{sampleId}</Box>
                            </Typography>
                            
                            <Box id="sample-details-description" sx={{ mt: 2 }}>
                                {levels.map((level, index) => {
                                    const levelName = level.replace('_', ' ').replace(/level/, ' Level');
                                    const data = sampleData?.[level]?.[sampleId];
                                    return data ? renderDataList(levelName, data, index) : null;
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

export default SampleDetailModal;