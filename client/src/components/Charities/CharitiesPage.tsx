import { Box } from "@mui/material";
import Sidebar from "../MainPage/SideNavBar";
import CharityCards from "./Non-ProfitOrg";
// import Dashboard from "./Dashboard";


const CharityPage: React.FC = () => {
  return (
    <Box>
        <Sidebar></Sidebar>
        <CharityCards></CharityCards>
    </Box>
  );
};

export default CharityPage;