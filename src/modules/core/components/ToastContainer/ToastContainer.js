import React from 'react';
import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';

import SlideInOutTransition from './SlideInOutTransition';

const ToastContainer = () => (
  <ToastifyContainer
    position={toast.POSITION.BOTTOM_RIGHT}
    type={toast.TYPE.DEFAULT}
    autoClose={3000}
    newestOnTop
    closeOnClick
    pauseOnHover
    toastClassName="toastify-toast"
    bodyClassName="toastify-body"
    progressClassName="toastify-progress"
    transition={SlideInOutTransition}
  />
);

export default ToastContainer;
