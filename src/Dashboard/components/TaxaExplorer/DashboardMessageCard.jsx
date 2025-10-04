import React from 'react';
import { Typography, Box } from '@mui/material';
import DashboardCard from './DashboardCard';

const DashboardMessageCard = ({ title, message }) => {
    return (
        <DashboardCard className="p-10 text-center">
            <Typography variant="h6" className="text-gray-400">{title}</Typography>
            {message && <Typography variant="body1" className="text-gray-500 mt-2">{message}</Typography>}
        </DashboardCard>
    );
};

export default DashboardMessageCard;