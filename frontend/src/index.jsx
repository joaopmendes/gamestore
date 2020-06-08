import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ReduxStore } from './create-store.config';
import { RouterConfig } from './create-router.config';
import { StyledTheme } from './create-theme.style';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap-css-only/css/bootstrap.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'mdbreact/dist/css/mdb.css';
import './global.css';

const App = () => (
  <StyledTheme>
    <ReduxStore>
      <ToastProvider autoDismiss autoDismissTimeout={6000}>
        <RouterConfig />
      </ToastProvider>
    </ReduxStore>
  </StyledTheme>
);

ReactDOM.render(<App />, document.getElementById('root'));
