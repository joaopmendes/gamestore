import React from 'react';
import MainLayout from '../../Components/MainLayout/MainLayout';
import Hero from '../../Components/Hero/Hero';
import banner from '../../assets/images/banner.jpg';

const Home: React.FC<{}> = () => {
  // const [response, setResponse] = useState<any>(null);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   dispatch(loadersSlice.actions.addLoader('testing'));
  //   // }, 3000)
  // }, []);
  return <MainLayout footerFixedBottom={true}>
    <Hero backgroundImage={banner}/>
  </MainLayout>;
};
export default Home;
