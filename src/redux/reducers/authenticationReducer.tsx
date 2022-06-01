import { createSlice } from '@reduxjs/toolkit';
import { useTokenAuthentication } from '../../hooks/useTokenAuthentication';
import { IAuthenticationReducerState } from '../states/IAuthenticationReducerState';

const tokenAuthentication = useTokenAuthentication();

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  return item ? JSON.parse(item) : {};
};

const initialAuthentication = () => {
  return tokenAuthentication.isAuthenticate();
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    isAuthenticate: initialAuthentication(),
  } as IAuthenticationReducerState,
  reducers: {
    handleLogin: (state, action) => {
      var result = action.payload;
      tokenAuthentication.saveLoginToken(result.token, result.refreshToken);
      localStorage.setItem('userData', JSON.stringify(result.username));
      state.userData = result.username;
      state.isAuthenticate = true;
    },
    handleLogout: (state) => {
      tokenAuthentication.deleteLogoutToken();
      state.isAuthenticate = false;
      state.userData = undefined;
      localStorage.removeItem('userData');
    },
    reloadUserData: (state, action) => {
      var result = action.payload;
      localStorage.setItem('userData', JSON.stringify(result.data));
      state.userData = result.data;
    },
  },
});

export const { handleLogin, handleLogout, reloadUserData } = authSlice.actions;

export default authSlice.reducer;
