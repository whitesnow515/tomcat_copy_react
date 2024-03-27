import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_BROKERINFO,
} from "../actions/types";

const initalState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  brokerInfo: [],
  error: {},
};

function profile (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_BROKERINFO:
      return {
        ...state,
        brokerInfo: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default profile;