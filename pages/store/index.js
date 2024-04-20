import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "@/components/sidebar";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StoreWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AddProducts = styled.a`
  color: blue;
  font-size: 20px;
  text-decoration: none;
  margin: 10px;
`;

export default function Store() {
  return (
    <StyledWrapper>
      <SideBar />
      <StoreWrapper>
        <div>Store</div>
        <AddProducts href="/store/products">제품 등록</AddProducts>
      </StoreWrapper>
    </StyledWrapper>
  );
}
