import React, { useEffect, useState } from "react";
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

const StyledBack = Styled.a`
  top: 20px;
  left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Community() {
  return (
    <StyledWrapper>
      <SideBar />
      <div>Community</div>
    </StyledWrapper>
  );
}
