import { Box } from "@mui/material";
import Sidebar from "../MainPage/SideNavBar";
import Chat from "./chatcomponent";


const ChatPage: React.FC = () => {
  return (

    <Box sx={{ display: 'flex', alignItems:"left" }}>
        <Sidebar></Sidebar>
        <Chat></Chat>
    </Box>
  );
};

export default ChatPage;