import React, { FC, PropsWithChildren } from 'react';
import { Container } from '../../global.styles';
import { InnerBackground, OuterBackground } from './MainComponentSC';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
type Props = {
  footerFixedBottom?: boolean
}
const MainLayout: FC<PropsWithChildren<Props>> = ({children, footerFixedBottom}) => {
  return (
    <OuterBackground>
      <Container>
        <InnerBackground>
          <Navbar/>
          <div style={{width: "100%"}}>
            {children}
          </div>

          <Footer footerFixedBottom={footerFixedBottom}/>
        </InnerBackground>
      </Container>
    </OuterBackground>
  );
};

export default MainLayout;
