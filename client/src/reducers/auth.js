import * as types from "../constants";

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        isAuthenticated: action.isAuth
      };
    case types.LOGOUT_SUCCESS:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
};
