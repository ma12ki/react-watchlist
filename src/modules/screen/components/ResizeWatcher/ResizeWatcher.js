import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';

import { metaSel, setScreenMeta } from '../../duck';
import { getScreenMeta } from '../../services';

class ResizeWatcher extends React.PureComponent {
  constructor(props) {
    super(props);

    this.updateMeta = this.updateMeta.bind(this);
    const throttledMeta = throttle(this.updateMeta, 100);

    window.removeEventListener('resize', throttledMeta);
    window.addEventListener('resize', throttledMeta);
  }

  updateMeta() {
    const { meta } = this.props;
    const newMeta = getScreenMeta();

    if (JSON.stringify(meta) !== JSON.stringify(newMeta)) {
      this.props.onSetMeta(newMeta);
    }
  }

  render() {
    return '';
  }
}

ResizeWatcher.propTypes = {
  meta: PropTypes.object.isRequired,
  onSetMeta: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  meta: metaSel(state),
});

const mapDispatch = (dispatch) => ({
  onSetMeta: (meta) => dispatch(setScreenMeta(meta))
});

export default connect(mapState, mapDispatch)(ResizeWatcher);
