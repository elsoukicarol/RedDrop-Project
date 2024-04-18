import { Box, Button, Paper, Typography, useTheme } from "@mui/material";

export default function CallToActionBox() {
    const theme = useTheme();
  
    return (
      <Paper
        sx={{
          maxWidth: 'lg',
          mx: 'auto', // centers the box
          my: 4,
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Donate now!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Want to save lives and make a difference?
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Join our Blood Heroes Club today!
          </Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ borderRadius: 20, px: 4 }}>
          Join now
        </Button>
      </Paper>
    );
  };