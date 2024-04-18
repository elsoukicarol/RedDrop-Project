import React, { useState } from 'react';
import { InputBase, Button, Avatar, Box, Stack, styled, alpha, Badge, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    marginRight: theme.spacing(2),
    // Set a specific width instead of 'auto'
    width: 600,
    marginLeft: 28,
    boxShadow: theme.shadows[1], // subtle shadow
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 2),
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));
  

  const UpperBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState('');
  
    const theme = useTheme();
  
    // Function to handle input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    // Function to execute when the search is submitted
    const handleSearchSubmit = () => {
      // Fetch the user's name from localStorage
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName || 'Carol');
    };
  
    return (
      <Box sx={{ marginLeft: 28, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Search theme={theme}>
          <SearchIconWrapper theme={theme}>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            theme={theme}
            placeholder="Search for posts"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* <IconButton
            type="submit"
            aria-label="search"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </IconButton> */}
        </Search>
        <Box sx={{ p: 2, display: 'flex', gap: 2 , marginLeft: 40}}>
          <Button variant="contained" color="secondary" sx={{ borderRadius: '20px' }}>
            Search
          </Button>
            <Stack direction="row" spacing={1}>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
              </Link>
              <span>{userName}</span>
            </Stack>
        </Box>
      </Box>
    );
  };

export default UpperBar;
