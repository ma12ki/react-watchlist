import React from 'react';

import { Calendar } from '../../calendar';
import { API_URL } from '../../../config';

console.log(API_URL);

const DashboardPage = () => {
  return (
    <Calendar />
  );
};

export default DashboardPage;
