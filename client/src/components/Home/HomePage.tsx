import { Box } from "@mui/material";
import Sidebar from "../MainPage/SideNavBar";
import Dashboard from "./Dashboard";


const HomePage: React.FC = () => {
  return (

    <Box sx={{ display: 'flex', alignItems:"left" }}>
        <Sidebar></Sidebar>
        <Dashboard></Dashboard>
    </Box>
  );
};

export default HomePage;