import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "@/components/sidebar";
import Table from "@/components/store/table";
import Link from "next/link";  // Next.js의 Link 컴포넌트를 사용

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

const StoreContents = styled.a`
  color: blue;
  font-size: 20px;
  text-decoration: none;
  margin: 10px;
`;

const RegisterButton = styled.button`
  align-self: flex-end;
  margin: 10px;
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Store() {
  return (
    <StyledWrapper>
      <SideBar />
      <StoreWrapper>
        <div>Store</div>
        <Link href="/store/products/write-product" passHref>
          <RegisterButton>상품등록</RegisterButton>
        </Link>
        {/* <StoreContents href="/store/write-product">제품 등록</StoreContents>
        <StoreContents href="/store/orders">결제 관리</StoreContents> */}
        <Table />
      </StoreWrapper>
    </StyledWrapper>
  );
}
