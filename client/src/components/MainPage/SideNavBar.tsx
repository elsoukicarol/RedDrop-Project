import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  ExpandLess,
  ExpandMore,
  LocalHospital as LocalHospitalIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const [openDonation, setOpenDonation] = React.useState(true);
  const [openBloodSupply, setOpenBloodSupply] = React.useState(true);

  const handleDonationClick = () => {
    setOpenDonation(!openDonation);
  };

  const handleBloodSupplyClick = () => {
    setOpenBloodSupply(!openBloodSupply);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button onClick={handleDonationClick}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Donation" />
            {openDonation ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDonation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Posts" />
              </ListItem>
              {/* Repeat for Donations, Charities, Comments */}
            </List>
          </Collapse>

          <ListItem button onClick={handleBloodSupplyClick}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Blood Supply" />
            {openBloodSupply ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBloodSupply} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              {/* Repeat for Donation Request, Activity */}
            </List>
          </Collapse>

          {/* Add other primary ListItems like Support & FAQs */}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
