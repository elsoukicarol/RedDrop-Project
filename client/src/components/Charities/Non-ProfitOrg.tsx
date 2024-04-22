import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation]);

interface Charity {
  id: number; // Add charity_id to the Charity interface
  charity_name: string;
  picture: string;
  description: string;
}

export default function CharitiesCard() {
    const navigate = useNavigate();

    // Function to handle checkout and save charity_id in local storage
    const checkout = (charityId: number) => {
        console.log(charityId);
      localStorage.setItem('charityId', String(charityId)); // Save charity_id in local storage
      navigate('/donate');
    };

    const [charities, setCharities] = useState<Charity[]>([]);

    useEffect(() => {
      const fetchCharities = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/charities/getall');
          setCharities(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching charities:', error);
        }
      };

      fetchCharities();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginLeft: "240px" }}>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Non-profit Making Organizations
          </Typography>
          <Grid container spacing={4}>
            {charities.map((charity) => (
              <Grid item key={charity.id} xs={12}>
                <Card sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, height: 140 }} // Adjust width as necessary
                    image={charity.picture}
                    alt={charity.charity_name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', backgroundColor: "#f9f9f9" }}>
                      <Typography variant="h6" component="div">
                        {charity.charity_name}
                      </Typography>
                      <Typography variant="body2">
                        {charity.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>

                      <Button variant="contained" color="primary" onClick={() => checkout(charity.id)}>
                        Donate
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    );
}
