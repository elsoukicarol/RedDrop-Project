import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ background: "white" }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", overflowX: "auto" }}
        >
          <Typography
            variant="h6"
            noWrap
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Blood Drop
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/donation"
              sx={{ color: "black", textTransform: "none" }}
            >
              Donation
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/blood-drives"
              sx={{ color: "black", textTransform: "none" }}
            >
              Blood Drives
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/support"
              sx={{ color: "black", textTransform: "none" }}
            >
              Support
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/signup"
              sx={{
                color: "black",
                textTransform: "none",
                borderColor: "black",
              }}
              variant="outlined"
            >
              Join
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/login"
              sx={{ background: "purple", textTransform: "none" }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
