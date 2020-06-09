import React, { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { isAnyloaderActive } from '../../Store/loadersSlice';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

type Props = {}
const FullPageLoader: FC<PropsWithChildren<Props>> = ({ children }) => {
  const isLoading = useSelector(isAnyloaderActive);

  return <>
    {isLoading && (
      <FullPageOverLoad>
        <Loader
          type="Oval"
          color="#ff4d23"
          height={150}
          width={150}
        />
      </FullPageOverLoad>
    )}
    {children}
  </>;
};
const FullPageOverLoad = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(255,255,255, 0.5);
  z-index: 9999;
  transition: all 1s ease-in;
`;
export default FullPageLoader;
