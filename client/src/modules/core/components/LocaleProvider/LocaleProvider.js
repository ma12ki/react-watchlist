import React from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider as AntdLocaleProvider } from 'antd';
import antdEn from 'antd/lib/locale-provider/en_US';

const LocaleProvider = ({ children }) => (
  <AntdLocaleProvider locale={antdEn}>
    {children}
  </AntdLocaleProvider>
);

LocaleProvider.propTypes = {
  children: PropTypes.object,
};

export default LocaleProvider;
