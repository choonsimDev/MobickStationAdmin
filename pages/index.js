import React from "react";
import Styled from "styled-components";
import SideBar from "@/components/sidebar";

const StyledWrapper = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export default function Home() {
  return (
    <StyledWrapper>
      <SideBar />
    </StyledWrapper>
  );
}
