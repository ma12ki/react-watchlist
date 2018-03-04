import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';

import { Spin } from '../../../shared';
import { default as store, rootReducer } from '../../store';
import { epic$ } from '../../duck';

class ModuleLoader extends React.Component {
  state = {
    loading: true,
    asyncModule: {},
  }

  componentDidMount() {
    this.loadAsyncModule(this.props.modulePromise);
  }

  componentWillReceiveProps = ({ modulePromise }) => {
    if (modulePromise !== this.props.modulePromise) {
      this.loadAsyncModule(modulePromise);
    }
  };

  loadAsyncModule = async (modulePromise) => {
    this.setState({ asyncModule: {}, loading: true });
    const asyncModule = await modulePromise;
    installModule(asyncModule);
    this.setState({ asyncModule, loading: false });
  }

  render() {
    const { componentName } = this.props;
    const { loading, asyncModule } = this.state;

    if (loading) {
      return <Spin delay={500} size="large" />;
    }
    const Component = asyncModule[componentName];
    return <Component />;
  }
}

const installModule = ({ moduleName, reducers, epics }) => {
  if (!store.installedAsyncModules[moduleName]) {
    store.installedAsyncModules[moduleName] = true;
    if (reducers) {
      store.asyncReducers[moduleName] = reducers;
      installReducers(moduleName, reducers);
    }
    if (epics) {
      installEpics(moduleName, epics);
    }
  }
};

const installReducers = (moduleName, reducers) => {
  store.replaceReducer(combineReducers({
    ...rootReducer,
    ...store.asyncReducers,
    [moduleName]: reducers,
  }));
};

const installEpics = (moduleName, epics) => {
  epic$.next(epics);
};

ModuleLoader.propTypes = {
  modulePromise: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ModuleLoader;
