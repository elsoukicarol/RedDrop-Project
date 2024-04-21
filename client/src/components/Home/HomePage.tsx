import { Box } from "@mui/material";
import Sidebar from "../MainPage/SideNavBar";
import Dashboard from "./Dashboard";
import Form from "../Form"
import DonorProfileCard from "../Donor/DonorPage";
import EventCard from "../UserProfile/EventCard";


const HomePage: React.FC = () => {
  return (

    ///// fix this
    <Box sx={{ display: 'flex', alignItems:"left" }}>
        <Sidebar></Sidebar>
        <Dashboard></Dashboard>
        {/* <Form></Form> */}
        {/* <DonorProfileCard></DonorProfileCard> */}
        <EventCard></EventCard>
    </Box>
  );
};

export default HomePage;