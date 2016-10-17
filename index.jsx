import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Bootstrap from 'bootstrap/less/bootstrap';
import Root from './containers/Root';
import configureStore from './store';
import Style from './css/style.css';

render(
  <Root store={configureStore()} history={browserHistory} />,
  document.getElementById('root')
);
