import * as actions from "../constants";
import { saveData } from "../utils";

export const loginAction = isAuth => ({
  type: actions.LOGIN_SUCCESS,
  isAuth: isAuth
});

export const islogin = (token, user) => {
  saveData(actions.TOKEN, token);
  return loginAction(user);
};

export const logout = () => {
  window.localStorage.removeItem(actions.TOKEN);
  return {
    type: actions.LOGOUT_SUCCESS
  };
};
