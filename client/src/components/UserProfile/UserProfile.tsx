import { Box } from "@mui/material";
import NavigationBar from "../LandingPage/NavegationBar";
import DonorProfileCard from "./DonorProfileCard";
import EventCard from "./EventCard";
import Form from "../Form";


const UserProfile: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <DonorProfileCard />
      <EventCard />
      <EventCard />
      <Form></Form>
    </Box>
  );
};

export default UserProfile;
