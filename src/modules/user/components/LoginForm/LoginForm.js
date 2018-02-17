import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { GOOGLE_CLIENT_ID } from '../../../config';
import { Spin } from '../../../shared';
import { loginRequest, loginLoadingSel } from '../../duck';
import styles from './LoginForm.css';

const LoginPage = ({ loading, onLogin }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.spinnerWrapper, { [styles.loading]: loading })}>
        <Spin />
      </div>
      <GoogleLogin
        className={styles.button}
        style={{}}
        clientId={GOOGLE_CLIENT_ID}
        disabled={loading}
        onSuccess={onLogin}
        onFailure={googleLoginFailure}
      />
    </div>
  );
};

const googleLoginFailure = () => toast.error('Google login failed');

LoginPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapState = state => ({
  loading: loginLoadingSel(state),
});

const mapDispatch = dispatch => ({
  onLogin: ({ accessToken: googleAccessToken /*, tokenId: googleToken */ }) => dispatch(loginRequest(googleAccessToken)),
});

export default connect(mapState, mapDispatch)(LoginPage);
