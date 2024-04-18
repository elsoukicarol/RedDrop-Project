import { Box } from "@mui/material";
import Sidebar from "./SideNavBar";
import MainLayout from "./MainLayout";
import UpperBar from "./UpperBar";


const MainPage: React.FC = () => {
  return (
    <Box>
        <UpperBar></UpperBar>
        <Sidebar></Sidebar>
        <MainLayout></MainLayout>
    </Box>
  );
};

export default MainPage;
