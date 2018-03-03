import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

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

ModuleLoader.propTypes = {
  moduleImport: PropTypes.func.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ModuleLoader;
