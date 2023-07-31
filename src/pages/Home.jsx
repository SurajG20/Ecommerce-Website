import { styled } from "styled-components";
import Annoucement from "../components/Annoucement";
import Navbar from "../components/Navbar";
const Container = styled.div``;
const Home = () => {
  return (
    <Container>
      <Annoucement />
      <Navbar />
    </Container>
  );
};
export default Home;
