import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const PageTitle = ({ children }) => {
  const title = children ? `${children} | Watchlist` : 'Watchlist';

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  children: PropTypes.string,
};

export default PageTitle;
