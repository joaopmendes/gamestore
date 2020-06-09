import styled from 'styled-components';

export const HeroContainer = styled.div`
  width: 100%;
  position: relative;
`
export const HeroImage = styled.img`
  width: 100%;
  height: 30rem;
  background-size: cover;
`
export const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h1 {
    font-size: 3rem;
    font-family: 'Balsamiq Sans', cursive;
    text-transform: uppercase;
    color: white;
    span {
      font-size: 5rem;
      color: ${props => props.theme.primary};
    }
  }
  p {
    font-size: .9rem;
    margin-top: 10px;
    font-family: 'Balsamiq Sans', cursive;
    text-transform: uppercase;
    color: white;
  }
`;
