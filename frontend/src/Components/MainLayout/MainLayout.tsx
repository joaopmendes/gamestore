import React, { FC, PropsWithChildren } from 'react';
import { Container } from '../../global.styles';
import { InnerBackground, OuterBackground } from './MainComponentSC';
import Navbar from '../Navbar/Navbar';
type Props = {

}
const MainLayout: FC<PropsWithChildren<Props>> = ({children}) => {
  return (
    <OuterBackground>
      <Container>
        <InnerBackground>
          <Navbar/>
          {children}
        </InnerBackground>
      </Container>
    </OuterBackground>
  );
};

export default MainLayout;
