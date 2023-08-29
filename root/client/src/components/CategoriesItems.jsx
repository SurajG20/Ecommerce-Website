import { styled } from "styled-components";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1px;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ height: "20vh" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: whitesmoke;
  color: gray;
  font-weight: 600;
  cursor: pointer;
`;
const CategoriesItems = ({ items }) => {
  return (
    <Container>
      <Link to={`/products/${items.cat}`}>
        <Image src={items.img}></Image>
        <Info>
          <Title>{items.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};
export default CategoriesItems;
