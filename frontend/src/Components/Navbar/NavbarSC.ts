import styled from 'styled-components';

export const NavbarContainer = styled.div`
  width: 100%;
  background: white;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 20px 10px;
`
export const NavbarBrandWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
export const NavbarBrand = styled.h1`
  font-size: 25px;
  font-family: 'Balsamiq Sans', cursive;
  text-transform: uppercase;
  span {
    font-size: 30px;
    color: ${props => props.theme.primary};
  }
`
export const SearchInputWrapper = styled.div`
  .md-form {
    margin: 0;
    margin-top: 5px;
  }
  width: 90%;
  margin: 0 auto
`
