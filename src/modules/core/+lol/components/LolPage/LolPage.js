import React from 'react';
import { connect } from 'react-redux';

import { H, PageTitle } from '../../../../shared';
import { maoSel, LOL } from '../../duck';
import styles from './LolPage.css';

const LolPage = ({ mao, onLol }) => {
  return (
    <React.Fragment>
      <PageTitle>LOL</PageTitle>
      <div className={styles.header} onClick={onLol}>
        <H size="1">OMFG LOL {mao}</H>
      </div>
    </React.Fragment>
  );
};

const mapState = state => ({
  mao: maoSel(state),
});

const mapDispatch = dispatch => ({
  onLol: () => dispatch({ type: LOL }),
});

export default connect(mapState, mapDispatch)(LolPage);
