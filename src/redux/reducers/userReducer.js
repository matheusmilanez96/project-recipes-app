import { ADD_USER } from '../actions/index';

export const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default user;
