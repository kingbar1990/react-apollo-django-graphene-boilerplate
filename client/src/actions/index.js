import { LOGIN_SUCCESS, LOGOUT_SUCCESS, TOKEN } from "../constants";
import { saveData } from "../utils";

export const loginAction = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const login = (token, user) => (dispatch) => {
  saveData(TOKEN, token);
  dispatch(loginAction(user));
};

export const logout = () => dispatch =>
  new Promise((resolve) => {
    window.localStorage.removeItem(TOKEN);
    dispatch({ type: LOGOUT_SUCCESS });
    resolve();
  });
