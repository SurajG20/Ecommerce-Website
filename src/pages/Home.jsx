import { styled } from "styled-components";
import Annoucement from "../components/Annoucement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
const Container = styled.main``;
const Home = () => {
  return (
    <Container>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
    </Container>
  );
};
export default Home;
