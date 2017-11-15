import { phone, tablet, desktop, phoneMaxWidth, tabletMaxWidth } from './constants';

const getScreenMeta = () => {
  const width = window.innerWidth;
  const height = window.innerWidth;
  const mode = getMode(width);

  return {
    mode,
    width,
    height,
  };
};

const getMode = (width) => {
  if (width <= phoneMaxWidth) {
    return phone;
  }
  if (width <= tabletMaxWidth) {
    return tablet;
  }
  return desktop;
};

export default {
  getScreenMeta,
};
