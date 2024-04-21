import React from 'react';
import { Box } from '@mui/material';
import Dashboard from './DashBoard';
import Filter from './Filters';

const MainLayout: React.FC = () => {
  return (
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Dashboard />
        <Filter />
      </Box>
  );
};

export default MainLayout;
