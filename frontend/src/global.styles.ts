import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const DefaultForm = styled.div`
  width: 600px;
  margin: 10em auto;
  position: relative;
`;
export const DefaultFormHeaderOffset = styled.div`
 position: absolute;
 top: -55px;
 left: 10px;
 right: 10px;
`;

export const DefaultFormTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-family: 'Balsamiq Sans', cursive;
  text-transform: uppercase;
  color: white;
`;

export const Spacer = styled.div<{ height?: string }>`
  width: 100%;
  display: block;
  height: ${({height}) => height || '30px'};
`;

export const HeadingTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-family: 'Balsamiq Sans', cursive;
  text-transform: uppercase;
  color: black;
  margin: 1rem auto;
`