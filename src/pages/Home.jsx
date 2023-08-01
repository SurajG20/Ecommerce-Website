import { styled } from "styled-components";
import Annoucement from "../components/Annoucement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
const Container = styled.main`
  padding: 0px 15px;
`;
const Home = () => {
  return (
    <Container>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
    </Container>
  );
};
export default Home;
