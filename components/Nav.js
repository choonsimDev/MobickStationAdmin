import Link from "next/link";
import { useRouter } from "next/router";
import styled from 'styled-components';

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: ${props => props.show ? '0' : '-100%'};
  width: 100%;
  height: 100vh;
  background-color: #F3F4F6; /* Light gray background */
  padding: 1rem;
  text-align: gray;
  transition: all 0.3s ease;
  @media (min-width: 768px) {
    position: static;
    width: auto;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  text-decoration: none;
  color: inherit;

  &.active {
    background-color: #FFE0AC; /* Highlight color */
    color: #0070f3; /* Primary text color */
    border-radius: 0.375rem;
  }
`;

const Icon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
`;

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function Nav({ show }) {
    const router = useRouter();
    const { pathname } = router;

    const isActive = (path) => pathname.includes(path);

    return (
        <Sidebar show={show}>
            <StyledLink href="/">
                <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG path remains the same */}
                </Icon>
                <span>EcommerceAdmin</span>
            </StyledLink>
            <NavigationContainer>
                {['/', '/orders', '/products', '/categories', '/settings'].map((path, index) => (
                    <StyledLink
                        key={index}
                        href={path}
                        className={isActive(path) ? 'active' : ''}
                    >
                        <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {/* SVG path remains the same */}
                        </Icon>
                        {path.slice(1) || 'Dashboard'}
                    </StyledLink>
                ))}
            </NavigationContainer>
        </Sidebar>
    );
}
