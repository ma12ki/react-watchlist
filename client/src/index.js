/* eslint-disable import/default */

import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './config';
import { store as configureStore } from './root';
import { components } from './modules/core';
import './styles/base.css';

require('./favicon.ico');

const store = configureStore();

render(
  <AppContainer>
    <components.Main store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./modules/core/components/Main/Main', () => {
    const NewMain = require('./modules/core/components/Main/Main').default;
    render(
      <AppContainer>
        <NewMain store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
