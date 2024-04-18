import { Box } from "@mui/material";
import NavigationBar from "./NavegationBar";
import MainContent from "./MainContent";
import HeroesSection from "./SecondSection";
import CallToActionBox from "./CallToAction";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <NavigationBar />
      <MainContent />
      <HeroesSection></HeroesSection>
      <CallToActionBox></CallToActionBox>
      <Footer></Footer>
    </Box>
  );
};

export default LandingPage;
