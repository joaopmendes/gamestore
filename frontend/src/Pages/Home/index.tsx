import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../../Services/UserService';
import MainLayout from '../../Components/MainLayout/MainLayout';
import { useAppDispatch } from '../../create-store.config';
import { authSlice } from '../../Store/authSlice';

interface IProps {
}

const Home: React.FC<IProps> = () => {
  const [response, setResponse] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const response = await UserService.login('testefrontend@gmail.comn', 'teste123');
      if(!response.hasError) {
        dispatch(authSlice.actions.login(response.data.user));
      }
    })();
  }, []);
  return <MainLayout>
    teste
  </MainLayout>;
};
export default Home;
