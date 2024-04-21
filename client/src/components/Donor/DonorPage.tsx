import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios';

interface Donor {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string; 
}

export default function DonorProfileCard() {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token is missing');
          return;
        }
        const decoded = jwtDecode<{ sub: number }>(token);
        const response = await axios.get('http://localhost:3001/api/user/donors', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: { userId: decoded.sub }
        });
        if (Array.isArray(response.data)) {
          const sortedDonors = response.data.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setDonors(sortedDonors);
        } else {
          console.error('Data received is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div style={{ display: 'flex', marginLeft: "300px"}}>
      {donors.map((donor, index) => (
        <Card key={index} style={{ marginTop: 35, marginLeft: 25, width: "500px"}}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <Avatar>{donor.first_name.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" component="h2">
                  {`${donor.first_name} ${donor.last_name}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Chip label="1 hour ago" size="small" />
              </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom>
              Thank you for your contribution
            </Typography>
            <Button color="primary">
              Contact Me!
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
