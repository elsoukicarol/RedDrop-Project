import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Chip,
  Button,
  Stack,
  Container,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  ClearAll as ClearAllIcon,
} from "@mui/icons-material";
import Filter from "./Filters";

const notifications = [
  {
    id: 1,
    title: "Donor Update",
    description: "Thank you for your contribution",
    time: "1 hour ago",
    avatar: "/path-to-avatar.jpg", // Replace with the path to your avatar images
  },
  // ... more notifications
];

export default function Dashboard() {
  return (
    <Container
      sx={{ display: "flex", p: 3, marginLeft: "240px", maxWidth: "none"}}
    >
      {" "}
      {/* Container to hold both components */}
      {/* Notifications Section with flexible width */}
      <Box sx={{ width: 800 }}>
        {" "}
        {/* Subtract width of Filter and margin */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Notifications
        </Typography>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            New
          </Typography>
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={notification.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.description}
                        </Typography>
                        <Chip
                          label={notification.time}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
