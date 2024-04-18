import { Box, Container, Grid, Typography } from "@mui/material";

export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f8f8f8',
          color: '#333',
          borderTop: '1px solid #e7e7e7',
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Blood Drop
              </Typography>
              <Typography variant="subtitle1">
                Your trusted donation platform since 1997!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Developed by Carol El Souki
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uizard © 2024
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
                <Typography variant="body2" gutterBottom component="a" href="#" sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                  Support
                </Typography>
                {/* Repeat for other links */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  