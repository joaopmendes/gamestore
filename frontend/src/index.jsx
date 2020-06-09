import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ReduxStore } from './create-store.config';
import { RouterConfig } from './create-router.config';
import { StyledTheme } from './create-theme.style';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './global.css';
import FullPageLoader from './Components/FullPageLoader/FullPageLoader';
import { AppInitializator } from './create-app-initializator.config';


const App = () => (
  <StyledTheme>
    <ReduxStore>
      <ToastProvider placement={"top-right"} style={{zIndex: 200}} autoDismiss autoDismissTimeout={6000}>
        <FullPageLoader>
          <AppInitializator>
            <RouterConfig />
          </AppInitializator>
        </FullPageLoader>
      </ToastProvider>
    </ReduxStore>
  </StyledTheme>
);

ReactDOM.render(<App />, document.getElementById('root'));
