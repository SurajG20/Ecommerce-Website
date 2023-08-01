import { styled } from "styled-components";
import Annoucement from "../components/Annoucement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
const Container = styled.main`
  padding: 0px 15px;
`;
const Home = () => {
  return (
    <Container>
      <Annoucement />
      <Navbar />
      <Slider />
    </Container>
  );
};
export default Home;
