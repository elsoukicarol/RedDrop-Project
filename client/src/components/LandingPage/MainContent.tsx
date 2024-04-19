import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Swiper as SwiperClass, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/types';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);

const primaryColor = "#1976d2";
const secondaryColor = "#fff";

interface Charity {
  charity_name: string;
  picture: string;
  description: string;
}

export default function MainContent() {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/charities/getall');
        setCharities(response.data);
      } catch (error) {
        console.error('Error fetching charities:', error);
      }
    };

    fetchCharities();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{
        my: 4,
        p: 4,
        backgroundImage: "url(/img/donatebloodbg.webp)",
        color: secondaryColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 500,
      }}>
        {/* <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: "bold", color: "white" , textAlign:"center", marginTop:-3}}>
          Donate blood with Red Drop
        </Typography>
        <Typography variant="h6" sx={{ color: secondaryColor, textAlign:"left", marginTop:55 }}>
          Join us in saving lives with every drop!
        </Typography> */}
      </Paper>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
      Non-profit Making Organizations
      </Typography>
      <SwiperClass
        spaceBetween={50}
        slidesPerView={5}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper: Swiper) => console.log(swiper)}
      >
        {charities.map((charity) => (
          <SwiperSlide key={charity.charity_name}>
            <Card sx={{ maxWidth: 345, mb: 4 }}>
              <CardMedia
                component="img"
                height="140"
                image={charity.picture}
                alt={`${charity.charity_name}`}
              />
              <CardContent sx={{backgroundColor:"#f9f9f9"}}>
                <Typography variant="h6" component="div">
                  {charity.charity_name}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </SwiperClass>
    </Container>
  );
}
