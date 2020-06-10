import React, { FC, PropsWithChildren } from 'react';
import { HeroContainer, HeroImage, HeroText } from './HeroSC';
import { NavbarBrand } from '../Navbar/NavbarSC';

type Props = {
  backgroundImage: any;

}
const Hero: FC<PropsWithChildren<Props>> = ({backgroundImage}) => {


  return <HeroContainer>
      <HeroImage src={backgroundImage} className="img-fluid" alt="My photo" />
      <HeroText>
        <h1>
          <span>Game</span>Shop
        </h1>
        <p>
          Buy any game of any console right here!
        </p>
      </HeroText>
  </HeroContainer>
};

export default Hero;
