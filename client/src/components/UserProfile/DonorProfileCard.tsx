import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Chip, Button } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const DonorProfileCard = () => {
  const donorData = {
    name: 'Scarlet Hound',
    age: '30 years, Male',
    lastDonation: '01/05/2022',
    donorId: '555 666 777 888',
    nextDonation: '15/09/2022'
  };

  return (
    <Card sx={{ maxWidth: 345 , borderRadius: "16px", height:700}}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            src="path-to-your-avatar.jpg" // Replace with your image path
            sx={{ width: 100, height: 100, mb: 1 }}
          />
          <Typography variant="h5" component="div">
            {donorData.name}
          </Typography>
          <Typography color="text.secondary">
            {donorData.age}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ mb: 1 }}>Donor Info</Typography>
          <Typography color="text.secondary">Last Donation</Typography>
          <Typography>{donorData.lastDonation}</Typography>
          <Typography color="text.secondary">Donor ID</Typography>
          <Typography>{donorData.donorId}</Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ mb: 1 }}>Donation History</Typography>
          <Chip label="Plasma" variant="outlined" sx={{ mr: 0.5 }} />
          <Chip label="Platelets" variant="outlined" sx={{ mr: 0.5 }} />
          <Chip label="Whole Blood" variant="outlined" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ mb: 1 }}>Next Donation</Typography>
          <Button variant="outlined" startIcon={<AccessAlarmIcon />} sx={{ mb: 1 }}>
            {donorData.nextDonation}
          </Button>
          <Typography>It's time to save lives again! Schedule your next donation appointment.</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonorProfileCard;
