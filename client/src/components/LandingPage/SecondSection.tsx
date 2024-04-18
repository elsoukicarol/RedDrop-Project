import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const primaryColor = '#1976d2'; // A shade of blue
const secondaryColor = '#fff'; 

interface DonationCenter {
    name: string;
    description: string;
    image: string;
    donationAmount: string;
  }
  
  const donationCenters: DonationCenter[] = [
    { name: 'Hope Hospital', description: 'Emergency center', image: 'url-to-hospital-image', donationAmount: 'from $50/donation' },
    { name: 'Life Clinic', description: 'Urgent care', image: 'url-to-clinic-image', donationAmount: 'from $70/donation' },
    // Add other centers here...
  ];
export default function HeroesSection() {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: primaryColor }}>
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
              <CardContent sx={{ bgcolor: primaryColor, color: secondaryColor }}>
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
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" size="large" sx={{ bgcolor: primaryColor }}>
          Join now
        </Button>
      </Box>
    </Container>
    );
  };