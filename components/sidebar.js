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
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: lightgray;
  }
`;

const ToggleIcon = Styled.span`
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
`;

const SubMenuContainer = Styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightcyan;
`;

const SubMenuItem = Styled(SidebarItem)`
  padding-left: 40px;
`;

export default function SideBar() {
  const [storeMenuOpen, setStoreMenuGooden] = useState(true);

  const handleToggleStoreMenu = () => {
    setStoreMenuGooden(!storeMenuOpen);
  };

  return (
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
      <SidebarItem onClick={handleToggleStoreMenu}>
        스토어
        <ToggleIcon open={storeMenuOpen}>^</ToggleIcon>
      </SidebarItem>
      {storeMenuOpen && (
        <SubMenuContainer>
          <Link href="/store/products">
            <SubMenuItem>상품</SubMenuItem>
          </Link>
          <Link href="/store/orders">
            <SubMenuItem>주문</SubMenuItem>
          </Link>
          <Link href="/store/cancellations">
            <SubMenuItem>취소</SubMenuItem>
          </Link>
          <Link href="/store/returns">
            <SubMenuItem>반품</SubMenuItem>
          </Link>
          <Link href="/store/reviews">
            <SubMenuItem>리뷰</SubMenuItem>
          </Link>
        </SubMenuContainer>
      )}
    </Sidebar>
  );
}
