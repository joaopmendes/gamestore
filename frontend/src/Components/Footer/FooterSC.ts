import styled from 'styled-components';

export const FooterContainer = styled.div<{footerFixedBottom?: boolean}>`
  width: 100%;
  height: 4rem;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  p {
  margin-bottom: 10px;
  }
  
  ${
  ({ footerFixedBottom }) => footerFixedBottom ? `
      position: fixed;
      bottom: 0;
    ` : ''
}
`;