import React from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import { Spin } from 'antd';

import { default as store, rootReducer } from '../../store';

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
    console.log(asyncModule);
    if (asyncModule.reducers) addNewReducer(asyncModule);
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

const addNewReducer = ({ reducers, moduleName }) => {
  if (!store.asyncReducers[moduleName]) {
    store.asyncReducers[moduleName] = reducers;
    store.replaceReducer(combineReducers({
      ...rootReducer,
      ...store.asyncReducers,
      [moduleName]: reducers,
    }));
  }
};

ModuleLoader.propTypes = {
  moduleImport: PropTypes.func.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ModuleLoader;
