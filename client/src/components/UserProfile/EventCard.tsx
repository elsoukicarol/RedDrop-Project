import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const EventCard = () => {
  return (
    <Card sx={{ display: "flex", flexDirection: 'column', borderRadius: '16px', overflow: 'hidden', boxShadow: 3, marginLeft: 2, width: 300 , height:700}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Donation Events
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocalHospitalIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Health Check-up" secondary="Sep 20" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RestaurantMenuIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Nutrition Guidance" secondary="Sep 30" />
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Upcoming Blood Drives
        </Typography>
        <ListItem>
          <ListItemIcon>
            <BloodtypeIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Blood Specialist" secondary="Sept 21" />
        </ListItem>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="secondary" size="large">
            Donate Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
