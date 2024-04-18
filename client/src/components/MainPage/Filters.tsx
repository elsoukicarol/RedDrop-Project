import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  Divider
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, ClearAll as ClearAllIcon } from '@mui/icons-material';

// Define the structure for filters
interface FilterItem {
  label: string;
  selected: boolean;
}

// Initialize some filters
const initialFilters: FilterItem[] = [
  { label: 'Comments', selected: false },
  { label: 'Likes', selected: false },
  { label: 'Reviews', selected: false },
  { label: 'Mentions', selected: false },
  { label: 'Donations', selected: false },
  { label: 'Messages', selected: false },
];

const Filter: React.FC = () => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterClick = (index: number) => {
    // Toggle the selected state for the clicked filter
    const newFilters = [...filters];
    newFilters[index].selected = !newFilters[index].selected;
    setFilters(newFilters);
  };

  const handleMarkAll = () => {
    setFilters(filters.map(filter => ({ ...filter, selected: true })));
  };

  const handleClearAll = () => {
    setFilters(filters.map(filter => ({ ...filter, selected: false })));
  };

  return (
    // Removed the Container as it's not needed when setting explicit width
    <Box sx={{ width: 300, p: 3, marginRight: "30px"}}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filter
        </Typography>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {filters.map((filter, index) => (
            <Chip
              key={filter.label}
              label={filter.label}
              clickable
              color="primary"
              variant={filter.selected ? 'filled' : 'outlined'}
              onClick={() => handleFilterClick(index)}
            />
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Button variant="outlined" startIcon={<CheckCircleIcon />} size="small" onClick={handleMarkAll}>
            Mark all
          </Button>
          <Button variant="outlined" startIcon={<ClearAllIcon />} size="small" onClick={handleClearAll}>
            Clear all
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Filter;
