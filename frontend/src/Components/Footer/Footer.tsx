import React, { FC, PropsWithChildren } from 'react';
import { FooterContainer } from './FooterSC';
type Props = {
  footerFixedBottom?: boolean
}
const Footer: FC<Props> = ({footerFixedBottom}) => {
  return (
    <FooterContainer footerFixedBottom={footerFixedBottom}>
      <p>Done by joaopmendes</p>
      <a href={"https://github.com/joaopmendes/gamestore"} target={"_blank"}>Github</a>
    </FooterContainer>
  );
};

export default Footer;
