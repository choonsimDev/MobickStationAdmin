import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import styled from 'styled-components';
import SideBar from "./sidebar";

const ScreenContainer = styled.div`
  min-height: screen;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

const SignOutButton = styled.button`
  padding: 0.5rem;
  position: fixed;
  left: 1.5rem;
  bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #0070f3; /* Update your primary color here */
`;

const LoginButton = styled.button`
  background-color: #0070f3; /* Primary button color */
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #0056b3; /* Darker shade for hover state */
  }
`;

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <MenuButton onClick={() => setShowNav(true)}>
          {/* SVG content remains unchanged */}
          Menu
        </MenuButton>

        <div>
          {/* <Nav show={showNav} /> */}
          <SideBar />
          <ContentContainer>{children}</ContentContainer>
          <SignOutButton onClick={() => signOut()}>
            {/* SVG content remains unchanged */}
            Sign out
          </SignOutButton>
        </div >
      </div >
    );
  } else {
    return (
      <ScreenContainer>
        <div className="text-center w-full">
          <LoginButton onClick={() => signIn("google")}>
            login with google
          </LoginButton>
        </div>
      </ScreenContainer>
    );
  }
}
