import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import { Spin } from 'antd';

import { default as store, rootReducer } from '../../store';
import { epic$ } from '../../duck';

class ModuleLoader extends React.Component {
  state = {
    loading: true,
    asyncModule: {},
  }

  componentDidMount() {
    this.loadAsyncModule();
  }

  loadAsyncModule = async () => {
    const asyncModule = await this.props.moduleImport();
    installModule(asyncModule);
    this.setState({ asyncModule, loading: false });
  }

  render() {
    const { componentName } = this.props;
    const { loading, asyncModule } = this.state;

    if (loading) {
      return <Spin />;
    }
    const Component = asyncModule[componentName];
    return <Component />;
  }
}

const installModule = ({ moduleName, reducers, epics }) => {
  if (!store.installedAsyncModules[moduleName]) {
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
  moduleImport: PropTypes.func.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ModuleLoader;
