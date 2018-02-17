import React from 'react';
import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';

const ToastContainer = () => (
  <ToastifyContainer
    position={toast.POSITION.BOTTOM_RIGHT}
    type={toast.TYPE.DEFAULT}
    autoClose={3000}
    newestOnTop
    closeOnClick
    pauseOnHover
  />
);

export default ToastContainer;