import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../shared';
import {
  episodeToPostponeSel,
  postponeModalVisibleSel,
  operationLoadingSel,
  postponeEpisodesRequest,
  closePostponeEpisodes,
} from '../../duck';
import PostponeEpisodesForm from './PostponeEpisodesForm';

const PostponeEpisodesModal = ({
  visible,
  episode,
  loading,
  onPostpone,
  onCancel,
}) => (
  <Modal
    visible={visible}
    title={`Postpone "${episode.title}"`}
    destroyOnClose={true}
    footer={null}
    onCancel={onCancel}
  >
    <PostponeEpisodesForm
      episode={episode}
      loading={loading}
      onPostpone={onPostpone}
      onCancel={onCancel}
    />
  </Modal>
);

PostponeEpisodesModal.propTypes = {
  episode: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onPostpone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapState = state => {
  const episode = episodeToPostponeSel(state);

  return {
    visible: postponeModalVisibleSel(state),
    episode,
    loading: operationLoadingSel(state, episode.showId),
  };
};

const mapDispatch = dispatch => ({
  onPostpone: ({ showId, season, episode, newPremiereDate, title }) => dispatch(postponeEpisodesRequest(showId, season, episode, newPremiereDate, title)),
  onCancel: () => dispatch(closePostponeEpisodes()),
});

export default connect(mapState, mapDispatch)(PostponeEpisodesModal);
