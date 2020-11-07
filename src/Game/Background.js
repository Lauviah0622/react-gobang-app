import styled from "styled-components";

const Frame = styled.div`
  pointer-events: none;
  height: 100%;
  display: grid;
  position: absolute;
  left: 15px;
  top: 15px;
  grid-template-rows: repeat(18, 30px);
  grid-template-columns: repeat(18, 30px);
  box-sizing: border-box;
  & > div {
    border-top: 1px solid black;
    border-right: 1px solid black;
  }

  & > div:nth-of-type(18n + 1) {
    /* border-bottom: 1px solid black; */
    border-left: 1px solid black;
  }

  & > div:nth-last-of-type(-n + 18) {
    border-bottom: 1px solid black;
  }
`;

export default function Background({ rows, columns }) {
  const squares = Array((rows - 1) * (columns - 1))
    .fill("")
    .map((_, id) => {
      return <div key={"brd-" + id}></div>;
    });
  return <Frame>{squares}</Frame>;
}
