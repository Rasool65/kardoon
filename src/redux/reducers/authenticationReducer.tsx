import { createSlice } from '@reduxjs/toolkit';
import { URL_LOGIN, URL_MAIN } from '@src/configs/urls';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import { useNavigate } from 'react-router-dom';
import { IAuthenticationReducerState } from '../states/IAuthenticationReducerState';

const tokenAuthentication = useTokenAuthentication();

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  return item ? JSON.parse(item) : {};
};
const initialUserName = () => {
  const item = window.localStorage.getItem('username');
  return item ? item : '';
};

const initialAuthentication = () => {
  return tokenAuthentication.isAuthenticate();
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    isAuthenticate: initialAuthentication(),
    username: initialUserName(),
  } as IAuthenticationReducerState,
  reducers: {
    handleLogin: (state, action) => {
      var result = action.payload;
      tokenAuthentication.saveLoginToken(result.token, result.token);
      localStorage.setItem('username', result.username);
      state.username = result.username;
      state.isAuthenticate = true;
    },
    handleLogout: (state) => {
      tokenAuthentication.deleteLogoutToken();
      state.isAuthenticate = false;
      state.userData = {};
      state.username = '';
      localStorage.removeItem('username');
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
