import { Box } from "@mui/material";
import Sidebar from "../MainPage/SideNavBar";
import DonorProfileCard from "./DonorPage";
// import Dashboard from "./Dashboard";


const DonorPage: React.FC = () => {
  return (
    <Box>
        <Sidebar></Sidebar>
        <DonorProfileCard></DonorProfileCard>
    </Box>
  );
};

export default DonorPage;