import {
  LOAD_AVAILABLE_EPISODES_START,
  LOAD_AVAILABLE_EPISODES_SUCCESS,
  LOAD_AVAILABLE_EPISODES_ERROR,
} from './actionTypes';

export const loadAvailableEpisodesStart = () => ({ type: LOAD_AVAILABLE_EPISODES_START });
export const loadAvailableEpisodesSuccess = (episodes) => ({ type: LOAD_AVAILABLE_EPISODES_SUCCESS, payload: episodes });
export const loadAvailableEpisodesError = (err) => ({ type: LOAD_AVAILABLE_EPISODES_ERROR, payload: err });
