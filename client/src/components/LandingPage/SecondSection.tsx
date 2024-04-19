import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const primaryColor = '#1976d2'; // A shade of blue
const secondaryColor = '#fff'; 

interface DonationCenter {
    name: string;
    description: string;
    image: string;
    donationAmount?: string;
  }
  
  const donationCenters: DonationCenter[] = [
    { name: 'Global Blood Fund', description: 'Emergency center', image: '/img/charities/globalbloodfund.png'},
    { name: 'Donner Sang Compter', description: 'Urgent care', image: '/img/charities/DSC.png' },
    { name: 'Association for the Advancement of Blood & Biotherapies', description: 'Urgent care', image: '/img/aabb.jpg' },
  ];
export default function HeroesSection() {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom >
        Heroes of donation
      </Typography>
      <Grid container spacing={2}>
        {donationCenters.map((center, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card raised sx={{ borderColor: primaryColor }}>
              <CardMedia
                component="img"
                height="140"
                image={center.image}
                alt={center.name}
              />
              <CardContent sx={{ backgroundColor:"#f9f9f9", color: "black" }}>
                <Typography variant="subtitle1" component="h2">
                  {center.name}
                </Typography>
                <Typography variant="body2">
                  {center.description}
                </Typography>
                <Button size="small" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                  {center.donationAmount}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    );
  };