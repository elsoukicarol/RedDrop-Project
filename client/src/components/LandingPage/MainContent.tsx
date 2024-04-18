import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
const primaryColor = "#1976d2";
const secondaryColor = "#fff";
export default function MainContent() {
  const bloodTypes = [
    { type: "O+", image: "/assets/img/add/1.png" },
    { type: "A-", image: "/assets/img/add/2.png" },
    { type: "B-", image: "/assets/img/add/3.png" },
    { type: "AB+", image: "/assets/img/add/4.png" },
    { type: "B+", image: "/assets/img/add/add2.png" },
    // Note: The last type 'B+' is repeated, you might want to have a different type or image here
  ];

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          my: 4,
          p: 4,
          backgroundImage: "url(/hero-background.jpg)",
          color: secondaryColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: primaryColor }}
        >
          Donate blood with Blood Drop
        </Typography>
        <Typography variant="h6" sx={{ color: secondaryColor }}>
          Join us in saving lives with every drop!
        </Typography>
        {/* Call to action buttons and other content here */}
      </Paper>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Urgent blood needs
      </Typography>
      <Grid container spacing={2}>
        {bloodTypes.map((blood) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={blood.type}>
            <Card sx={{ maxWidth: 345, mb: 4 }}>
              <CardMedia
                component="img"
                height="140"
                image={blood.image} // Use the image from the object
                alt={`${blood.type} blood`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {blood.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
