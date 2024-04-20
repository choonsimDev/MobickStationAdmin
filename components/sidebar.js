import Styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const Sidebar = Styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: lightblue;
    height: 100vh; 
  `;

const SidebarItem = Styled.div`
  padding: 20px;
  cursor: pointer;
  color: black; // Link 기본 색상이 파란색이므로 변경합니다.
  text-decoration: none; // 밑줄 제거
  &:hover {
    background-color: lightgray;
  }
`;

export default function SideBar() {
  return (
    <div>
      <Sidebar>
        <Link href="/">
          <SidebarItem>대시보드</SidebarItem>
        </Link>
        <Link href="/community">
          <SidebarItem>커뮤니티</SidebarItem>
        </Link>
        <Link href="/notice">
          <SidebarItem>공지사항</SidebarItem>
        </Link>
        <Link href="/store">
          <SidebarItem>스토어</SidebarItem>
        </Link>
      </Sidebar>
    </div>
  );
}
