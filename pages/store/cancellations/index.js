import React from 'react';
import styled from 'styled-components';
import SideBar from '@/components/sidebar';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Cancellations = () => {
    return (
        <StyledWrapper>
            <SideBar />
            <h1>cancellations</h1>
        </StyledWrapper>
    );
};

export default Cancellations;
