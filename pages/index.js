import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import styled from 'styled-components';

const WelcomeText = styled.h2`
  color: #0070f3; /* Using Tailwind's blue-600 */
  display: flex;
  justify-content: between;
`;
const UserInfo = styled.div`
  background-color: #E5E7EB; /* Using Tailwind's gray-300 */
  color: black;
  display: flex;
  gap: 0.25rem;
  border-radius: 0.375rem; /* Rounded-lg in Tailwind */
  overflow: hidden;
`;
const UserAvatar = styled.img`
  width: 2rem; /* 8 width in Tailwind */
  height: 2rem; /* 8 height in Tailwind */
`;
const UserName = styled.span`
  padding: 0.25rem 0.5rem; /* Py-1 Px-2 in Tailwind */
`;

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <WelcomeText>
        Hello, <b>{session?.user?.email || "who...are...you?"}</b>
      </WelcomeText>
      <UserInfo>
        <UserAvatar
          src={session?.user?.image}
          alt="avatar"
        />
        <UserName>{session?.user?.name}</UserName>
      </UserInfo>
    </Layout>
  );
}
