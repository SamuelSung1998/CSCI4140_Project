import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CookiesProvider } from 'react-cookie';

import * as serviceWorker from './serviceWorker';
import store from './app/redux';
import history from './app/redux/history';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './app/App';

const Root: React.FC = () => (
  <>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ConnectedRouter>
    </Provider>
  </>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
