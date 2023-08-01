import { styled } from "styled-components";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { sliderItems } from "../data";
import { useState } from "react";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  position: absolute;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideInd * -100}vw);
  transition: all 1.5s ease;
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  font-size: 20px;
  margin: 50px 0;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  font-size: 20px;
`;

const Slider = () => {
  const [slideInd, setSetInd] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSetInd(slideInd > 0 ? slideInd - 1 : 2);
    } else {
      setSetInd(slideInd < 2 ? slideInd + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackOutlinedIcon />
      </Arrow>
      <Wrapper slideInd={slideInd}>
        {sliderItems.map((item, index) => (
          <Slide bg={item.bg} key={index}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardOutlinedIcon />
      </Arrow>
    </Container>
  );
};
export default Slider;
