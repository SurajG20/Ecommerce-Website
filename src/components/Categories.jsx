import { styled } from "styled-components";
import { categories } from "../data";
import CategoriesItems from "./CategoriesItems";
const Container = styled.div`
  display: flex;
  padding: 20px;
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((items) => (
        <CategoriesItems items={items} key={items.id} />
      ))}
    </Container>
  );
};
export default Categories;
